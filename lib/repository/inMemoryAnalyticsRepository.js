'use strict';

module.exports = () => {
	const analytics = [];

	return {
		save: (userId, timestamp, data) => {
			analytics.push({
				userId: userId,
				ts: timestamp,
				data: data
			});
		},

		fetchAll: () => {
			return analytics;
		}
	};
};