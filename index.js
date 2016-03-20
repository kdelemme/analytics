'use strict';
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const config  = require('./config/config');
const sqlClient = require('knex')(config.database);
const analyticsRepository = require('./lib/repository/sqlAnalyticsRepository')(sqlClient);
const uniqueId = require('./lib/domain/uniqueId')();

app.use(cookieParser(config.cookieSecret));

app.get('/status', (req, res) => {
	res.status(200).send('OK');
});

app.get('/a.js', (req, res) => {
	res.status(200).sendFile(__dirname + '/public/a.js');
});

app.use(require('./lib/tracker')(config, uniqueId, analyticsRepository));

const server = app.listen(config.port, function () {
	const host = server.address().address;
	const port = server.address().port;

	console.log('Analytics listening at http://%s:%s', host, port);
});