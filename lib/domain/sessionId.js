'use strict';

module.exports = () => {
	const MAX_USER_ID = 100000000;
	
	return {
		isValid: (sessionId) => {
			return sessionId && sessionId.split('.')[0] < MAX_USER_ID && sessionId.split('.')[1] < Date.now();
		},

		generate: () => {
			return `${Math.round(Math.random() * MAX_USER_ID)}.${Date.now()}` ;
		}
	};
};