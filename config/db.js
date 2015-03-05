// Dependencies
var mongoose = require('mongoose');
	chalk = require('chalk');

module.exports = function(config) {
	return mongoose.connect(config.db.uri, config.db.options, function(err) {
		if (err) {
			console.error(chalk.red('Could not connect to MongoDB!'));
			console.log(chalk.red(err));
		}
	});
};

mongoose.connection.on('error', function(err) {
	console.error(chalk.red('MongoDB connection error: ' + err));
	process.exit(-1);
});
