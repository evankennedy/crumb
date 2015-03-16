// Dependencies
var bodyParser = require('body-parser'),
	compression = require('compression'),
	consolidate = require('consolidate'),
	cookieParser = require('cookie-parser'),
	express = require('express'),
	glob = require('glob'),
	helmet = require('helmet'),
	logger = require('./logger'),
	methodOverride = require('method-override'),
	morgan = require('morgan'),
	passport = require('passport'),
	path = require('path');

module.exports = function(config, db) {
	// Initialize express app
	var app = express();

	// Pack models
	finder.models.forEach(function(file) {
		require(file);
	});

	// Setting application local variables
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;
	app.locals.jsFiles = [];
	app.locals.cssFiles = [];
	
	config.assets.lib.js.concat(config.assets.js).forEach(function(file) {
		glob(file, {sync: true}, function(err, files) {
			if(!err) {
				files.forEach(function(file) {
					app.locals.jsFiles.push(file.replace(/^public\//,''));
				});
			}
		});
	});
	
	config.assets.lib.css.concat(config.assets.css).forEach(function(file) {
		glob(file, {sync: true}, function(err, files) {
			if(!err) {
				files.forEach(function(file) {
					app.locals.cssFiles.push(file.replace(/^public\//,''));
				});
			}
		});
	});

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	app.use(compression({
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 3
	}));

	app.set('showStackError', true);
	app.engine('view.html', consolidate[config.templateEngine]);
	app.set('view engine', 'view.html');
	app.set('views', './views');
	app.use(morgan(logger.getLogFormat(), logger.getLogOptions()));
	
	if (process.env.NODE_ENV === 'development')
		app.set('view cache', false);
	else if (process.env.NODE_ENV === 'production')
		app.locals.cache = 'memory';
	
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.disable('x-powered-by');
	app.use(express.static(path.resolve('./public')));
	app.use(cookieParser());
	app.use(passport.initialize());
	
	// Load req.user
	app.route('*').all(function(req, res, next) {
		// if any roles have changed, we need to recreate the token from the database
		// if user has a flag on them, we need to recreate the token from the database
		// how to set flags? remember, we don't want to do db calls for each request. What if the app polls occasionally and puts it in local memory? That way multiple clusters will stay up to date with each other.
		// Validate JWT
		var jwt = {};
		if(jwt.valid) {
			if(jwt.expired) {
				// Lookup in refresh token db (if exists, trust data)
				// Generate new token and attach to headers
				if(jwt.refresh_no_exist) return next();
				// Attach new token headers
			}
			
			// load user into req.user
			
			if(jwt.expiring_soon) {
				// Generate new token and attach to headers
			}
		}
		
		return next();
	});
	
	// Router
	finder.routes.forEach(function(file) {
		require(file)(app);
	});

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		if (!err) return next();

		console.error(err.stack);

		res.status(500).render('500', {
			error: err.stack
		});
	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not Found'
		});
	});

	// Return Express server instance
	return app;
};
