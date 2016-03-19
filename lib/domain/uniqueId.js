'use strict';

module.exports = () => {
	const MAX_ID = 100000000;
	
	return {
		isValid: (userId) => {
			return userId && userId.split('.')[0] < MAX_ID && userId.split('.')[1] < Date.now();
		},

		generate: () => {
			return `${Math.round(Math.random() * MAX_ID)}.${Date.now()}` ;
		}
	};
};