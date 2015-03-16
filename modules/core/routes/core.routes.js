module.exports = function(app) {
	// Root routing
	var core = require(finder('core.controller'));
	app.route('/').get(core.index);
};
