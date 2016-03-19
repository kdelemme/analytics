'use strict';
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const config  = require('./config/config');
const analyticsRepository = require('./lib/repositories/inMemoryAnalyticsRepository')();

app.use(cookieParser(config.cookieSecret));
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", true);
	next();
});

app.get('/status', function(req, res) {
	res.status(200).send('OK');
});

app.use(require('./lib/tracker.js')(config, analyticsRepository));

const server = app.listen(config.port, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Analytics listening at http://%s:%s', host, port);
});