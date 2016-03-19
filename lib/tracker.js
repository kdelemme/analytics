'use strict';
const express = require('express');
const uuid = require('node-uuid');

module.exports = (config, analyticsRepository) => {
	const router = express.Router();

	let getSessionId = (req, res, next) => {
		req.sessionId = req.cookies.analytics || uuid.v4();
		next();
	};

	let setCookie = (req, res, next) => {
		res.cookie('analytics', req.sessionId, { maxAge: 60*60*24*365*1000, httpOnly: true, domain: req.hostname });
		next();
	};

	let handleParameters = (req, res, next) => {
		req.analytics = {
			qs: req.query,
			hostname: req.hostname,
			ip: req.ip
		};
		next();
	};

	let save = (req, res, next) => {
		analyticsRepository.save(req.sessionId, Date.now(), req.analytics);
		next();
	};

	router.get('/pixel.gif', getSessionId, setCookie, handleParameters, save, function(req, res) {
		res.status(200).send('OK');
	});

	router.get('/debug', (req, res) => {
		res.status(200).send(analyticsRepository.fetchAll());
	});

	return router;
};