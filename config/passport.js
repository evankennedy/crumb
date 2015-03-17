// Dependencies
var passport = require('passport'),
	User = require('mongoose').model('User'),
	path = require('path'),
	glob = require('glob'),
	config = require('./config');
	
/**
 * Module init function.
 */
module.exports = function() {
	// Serialize sessions
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// Deserialize sessions
	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}, '-salt -password', function(err, user) {
			done(err, user);
		});
	});

	// Initialize strategies
	glob.sync('./config/strategies/**/*.js').forEach(function(file) {
		require(path.resolve(file))();
	});
};
