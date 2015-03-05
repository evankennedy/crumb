// Dependencies
var init = require('./app/init')(),
	config = require('./config/config'),
	chalk = require('chalk');

// Init Database and Configure Express & Passport
var db = require('./config/db')(config);
var app = require('./config/express')(db);
require('./config/passport')();

// I'm listening... sheesh!
app.listen(config.port);

// You've been exposed!
exports = module.exports = app;

// Can we talk about this?
console.log('--');
console.log(chalk.green(config.app.title + ' application started'));
console.log('--');
console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
console.log(chalk.green('Port:\t\t\t\t' + config.port));
console.log(chalk.green('Database:\t\t\t' + config.db.uri));
if (process.env.NODE_ENV === 'secure') {
	console.log(chalk.green('HTTPs:\t\t\t\ton'));
}
console.log('--');