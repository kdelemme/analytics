'use strict';
const express = require('express');
const url = require('url');
const R = require('ramda');

module.exports = (config, uniqueId, analyticsRepository) => {
	const router = express.Router();
	const MAX_AGE_COOKIE_USER = 60*60*24*365*1000;
	const MAX_AGE_COOKIE_SESSION = 60*30*1000;

	let getSessionId = (req, res, next) => {
		req.sessionId = uniqueId.isValid(req.cookies.analytics_session) ? req.cookies.analytics_session : uniqueId.generate();
		next();
	};
	
	let getUserId = (req, res, next) => {
		req.userId = uniqueId.isValid(req.cookies.analytics_user) ? req.cookies.analytics_user : uniqueId.generate();
		next();
	};

	let setCookies = (req, res, next) => {
		let parsedUrl = url.parse(req.analytics.url);
		let domain = parsedUrl.hostname.split('.').slice(-2).join('.');

		res.cookie('analytics_user', req.userId, { maxAge: MAX_AGE_COOKIE_USER, domain: domain });
		res.cookie('analytics_session', req.sessionId, { maxAge: MAX_AGE_COOKIE_SESSION, domain: domain });
		next();
	};

	let extractParameters = (req, res, next) => {
		req.analytics = {
			referrer: req.query.referrer,
			title: req.query.title,
			screen_height: req.query.screenHeight,
			screen_width: req.query.screenWidth,
			user_agent: req.query.userAgent,
			language: req.query.language,
			platform: req.query.platform,
			url: req.query.url,
			ip: req.ip,
			timestamp: Date.now()
		};
		next();
	};

	let allowCors = (req, res, next) => {
		let parsedUrl = url.parse(req.analytics.url);

		res.header('Access-Control-Allow-Origin', `${parsedUrl.protocol}//${parsedUrl.host}`);
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		res.header('Access-Control-Allow-Credentials', true);
		next();
	};

	let save = (req, res, next) => {
		analyticsRepository.save(req.userId, req.sessionId, req.analytics).catch((err) => {
			console.log(err);
		});
		next();
	};

	router.get('/a.gif', extractParameters, allowCors, getUserId, getSessionId, setCookies, save, function(req, res) {
		res.status(200).send();
	});

	return router;
};