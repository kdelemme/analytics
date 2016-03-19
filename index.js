'use strict';
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const config  = require('./config/config');
const analyticsRepository = require('./lib/repository/inMemoryAnalyticsRepository')();
const sessionId = require('./lib/domain/sessionId')();

app.use(cookieParser(config.cookieSecret));

app.get('/status', function(req, res) {
	res.status(200).send('OK');
});

app.use(require('./lib/tracker.js')(config, sessionId, analyticsRepository));

const server = app.listen(config.port, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Analytics listening at http://%s:%s', host, port);
});