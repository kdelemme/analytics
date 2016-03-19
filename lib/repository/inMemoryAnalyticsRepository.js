'use strict';

module.exports = () => {
	const analytics = [];

	return {
		save: (sessionId, data) => {
			analytics.push({
				sessionId: sessionId,
				data: data
			});
		},

		fetchAll: () => {
			return analytics;
		}
	};
};