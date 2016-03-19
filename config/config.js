'use strict';

module.exports = {
    port: 4001,
    cookieSecret: 'mYS3cR3t-',
    database: {
    	client: 'mysql',
    	connection: {
			host: '127.0.0.1',
			user: 'root',
			password: '',
			database: 'analytics'
		}
	}
};