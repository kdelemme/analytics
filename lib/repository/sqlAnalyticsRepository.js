'use strict';
const R = require('ramda');

module.exports = (sqlClient) => {
	const table = 'analytics';

	return {
		save: (userId, sessionId, data) => {
			return sqlClient(table).insert({
				user_id: userId,
				session_id: sessionId,
				referrer: data.referrer,
				url: data.url,
				title: data.title,
				screen_height: data.screen_height,
				screen_width: data.screen_width,
				user_agent: data.user_agent,
				language: data.language,
				platform: data.platform,
				ip: data.ip,
				timestamp: new Date(data.timestamp),
			});
		},

		fetchAll: () => { 
			return new Promise((resolve, reject) => {
				sqlClient.select('*').from(table)
				.then((rows) => { 
					resolve(rows); 
				});
			});
		}
	};
};