'use strict';

module.exports = (sqlClient) => {
	const table = 'analytics';

	return {
		save: (userId, sessionId, data) => {
			return sqlClient(table).insert({
				site_id: data.site_id,
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
		}
	};
};