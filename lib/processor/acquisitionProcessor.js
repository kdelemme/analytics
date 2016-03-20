'use strict';
const urlParser = require('url');
const qsParser = require('querystring');

module.exports = () => {
	const REFERRER_SOURCE_RULE_MAP = [
		{
			regex: /^https:\/\/www.google\.(co\.uk|[a-z]{2,3})\//,
			source: 'google'
		},
		{
			regex: /^https:\/\/www.bing\.(co\.uk|[a-z]{2,3})\//,
			source: 'bing'
		},
		{
			regex: /^https:\/\/www.yahoo\.(co\.uk|[a-z]{2,3})\//,
			source: 'yahoo'
		},
		{
			regex: /^https:\/\/www.facebook\.(co\.uk|[a-z]{2,3})\//,
			source: 'facebook'
		},
		{
			regex: /^https:\/\/www.twitter\.(co\.uk|[a-z]{2,3})\//,
			source: 'twitter'
		},
		{
			regex: /^https:\/\/plus.google\.(co\.uk|[a-z]{2,3})\//,
			source: 'google+'
		}
	];
	const SEARCH_ENGINES = ['google', 'bing', 'yahoo'];
	const SOCIAL_SITES = ['facebook', 'twitter', 'google+'];

	let attributeSourceFromReferrer = (referrer) => {
		let matched = REFERRER_SOURCE_RULE_MAP.find((rule) => referrer.match(rule.regex));
		return matched ? matched.source : undefined;
	};

	let isSearchEngineSource = (source) => SEARCH_ENGINES.indexOf(source) > -1;
	let isSocialSource = (source) => SOCIAL_SITES.indexOf(source) > -1;
	
	return {
		run: (referrer, url) => {
			let acquisition = { source: undefined, medium: undefined };
			let parsedUrl = {};
			let parsedUrlQs = {};
			if (url) {
				parsedUrl = urlParser.parse(url);
				parsedUrlQs = qsParser.parse(parsedUrl.query);
			}

			if (referrer) {
				let parsedReferrer = urlParser.parse(referrer);
				acquisition.source = attributeSourceFromReferrer(referrer);

				if (isSearchEngineSource(acquisition.source)) {
					acquisition.medium = parsedUrlQs['utm_medium'] || 'organic';
				}
				else if (isSocialSource(acquisition.source)) {
					acquisition.medium = 'social';
				}
				else {
					acquisition.source = parsedReferrer.hostname;
					acquisition.medium = 'referral';
				}
			} 
			else {
				acquisition.source = parsedUrlQs['utm_source'] || '(direct)';
				acquisition.medium = parsedUrlQs['utm_medium'] || '(none)';
			}

			return acquisition;
		}
	};
};