module.exports = {
	port: process.env.PORT || 3001,
	db: {
		uri: 'mongodb://ds033429.mongolab.com:33429/dev',
		options: {
			user: 'evan',
			pass: 'mypass'
		}
	},
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'dev',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			//stream: 'access.log'
		}
	}
};
