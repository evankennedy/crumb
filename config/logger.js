// Dependencies
var morgan = require('morgan');
var config = require('./config');
var fs = require('fs');

module.exports = {

	getLogFormat: function() {
		return config.log.format;
	},

	getLogOptions: function() {
		var options = {};
		
		try {
			if ('stream' in config.log.options) {
				// Make parent directories first
				var current = '';
				config.log.options.stream.split('/').slice(0, -1).forEach(function(dir) {
					fs.mkdir((current += dir + '/'));
				});
				
				options = {
					stream: fs.createWriteStream(process.cwd() + '/' + config.log.options.stream, {flags: 'a'})
				};
			}
		} catch (e) {
			options = {};
		}

		return options;
	}

};
