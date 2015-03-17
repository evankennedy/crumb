// Dependencies
var chalk = require('chalk'),
	glob = require('glob');

module.exports = function() {
	var env = glob.sync('./config/env/' + process.env.NODE_ENV + '.js');
	if(env.length == 0) {
		if (process.env.NODE_ENV) {
			console.error(chalk.red('No configuration file found for "' + process.env.NODE_ENV + '" environment! Using development instead.'));
		} else {
			console.error(chalk.red('NODE_ENV is not defined! Using default development environment.'));
		}
		process.env.NODE_ENV = 'development';
	}
};
