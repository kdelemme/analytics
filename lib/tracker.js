'use strict';
const express = require('express');
const url = require('url');

module.exports = (config, sessionId, analyticsRepository) => {
	const router = express.Router();
	const MAX_AGE_COOKIE = 60*60*24*365*1000;
	
	let getSessionId = (req, res, next) => {
		req.sessionId = sessionId.isValid(req.cookies.analytics) ? req.cookies.analytics : sessionId.generate();
		next();
	};

	let setCookie = (req, res, next) => {
		res.cookie('analytics', req.sessionId, { maxAge: MAX_AGE_COOKIE, domain: req.analytics.url.domain });
		next();
	};


	let extractParameters = (req, res, next) => {
		let parsedUrl =  url.parse(req.query.url);
		parsedUrl.domain = `${parsedUrl.hostname.split('.').slice(-2).join('.')}`;

		req.analytics = {
			url: parsedUrl,
			referrer: req.query.referrer,
			title: req.query.title,
			screenHeight: req.query.screenHeight,
			screenWidth: req.query.screenWidth,
			userAgent: req.query.userAgent,
			language: req.query.language,
			platform: req.query.platform,
			ip: req.ip
		};
		next();
	};

	let allowCors = (req, res, next) => {
		res.header('Access-Control-Allow-Origin', `${req.analytics.url.protocol}//${req.analytics.url.host}`);
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		res.header('Access-Control-Allow-Credentials', true);
		next();
	};

	let save = (req, res, next) => {
		let session = sessionId.extract(req.sessionId);
		analyticsRepository.save(session.userId, session.timestamp, req.analytics);
		next();
	};

	router.get('/a.gif', extractParameters, allowCors, getSessionId, setCookie, save, function(req, res) {
		res.status(200).send('OK');
	});

	router.get('/debug', (req, res) => {
		res.status(200).send(analyticsRepository.fetchAll());
	});

	return router;
};