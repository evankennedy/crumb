/**
 * Module dependencies.
 */
var chalk = require('chalk'),
	glob = require('glob');

/**
 * Module init function.
 */
module.exports = function() {
	glob('./config/env/' + process.env.NODE_ENV + '.js', {sync: true}, function(err, environmentFiles) {
		if (!environmentFiles.length) {
			if (process.env.NODE_ENV) {
				console.error(chalk.red('No configuration file found for "' + process.env.NODE_ENV + '" environment! Using development instead.'));
			} else {
				console.error(chalk.red('NODE_ENV is not defined! Using default development environment.'));
			}

			process.env.NODE_ENV = 'development';
		}
	});
};
