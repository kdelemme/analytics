'use strict';

module.exports = () => {
	const analytics = [];

	return {
		save: (sessionId, timestamp, data) => {
			analytics.push({
				sessionId: sessionId,
				ts: timestamp,
				data: data
			});
		},

		fetchAll: () => {
			return analytics;
		}
	};
};