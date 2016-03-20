'use strict';

module.exports = () => {
	const analytics = [];

	return {
		save: (userId, sessionId, data) => {
			analytics.push({
				userId: userId,
				sessionId: sessionId,
				data: data
			});
		}
	};
};