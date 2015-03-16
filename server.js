// Dependencies
var fs = require('fs'),
	http = require('http'),
	https = require('https'),
	chalk = require('chalk');

// Init finder
global.finder = require('./config/finder');

// Init Database and Configure Express & Passport
var init = require('./config/init')(),
	config = require('./config/config'),
	db = require('./config/db')(config),
	app = require('./config/express')(config, db);
	require('./config/passport')();

// I'm listening! sheesh...
http.createServer(app).listen(config.port);
if(config.secure) https.createServer({
	key: fs.readFileSync(config.secure.options.key, 'utf8'),
	cert: fs.readFileSync(config.secure.options.cert, 'utf8')
}, app).listen(config.secure.port);

// You've been exposed!
exports = module.exports = app;

// Lets review.
console.log('--');
console.log(chalk.green(config.app.title + ' application started'));
console.log('--');
console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
console.log(chalk.green('Port:\t\t\t\t' + config.port));
if (config.secure) console.log(chalk.green('HTTPs:\t\t\t\t' + config.secure.port));
console.log(chalk.green('Database:\t\t\t' + config.db.uri));
console.log('--');
