module.exports = {
	port: process.env.PORT || 3000,
	db: {
		uri: 'mongodb://ds033429.mongolab.com:33429/prod',
		options: {
			user: 'evan',
			pass: 'mypass'
		}
	},
	secure: {
		port: 443,
		options: {
			key: './config/sslcerts/key.pem',
			cert: './config/sslcerts/cert.pem'
		}
	},
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			stream: 'access.log'
		}
	}
};
