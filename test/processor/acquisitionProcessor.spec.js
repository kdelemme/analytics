'use strict';
const expect = require('expect.js');

describe('AcquisitionProcessor', () => {
	const acquisitionProcessor = require('../../lib/processor/acquisitionProcessor')();

	it('should attribute to google', (done) => {
		let referrers = ['https://www.google.com/', 'https://www.google.co.uk/', 'https://www.google.sk/'];

		referrers.map((referrer) => {
			let acquisition = acquisitionProcessor.run(referrer);
			expect(acquisition).to.have.property('source', 'google');
		});

		done();
	});

	it('should attribute to bing', (done) => {
		let referrers = ['https://www.bing.com/', 'https://www.bing.co.uk/', 'https://www.bing.sk/'];

		referrers.map((referrer) => {
			let acquisition = acquisitionProcessor.run(referrer);
			expect(acquisition).to.have.property('source', 'bing');
		});

		done();
	});

	it('should attribute to yahoo', (done) => {
		let referrers = ['https://www.yahoo.com/', 'https://www.yahoo.co.uk/', 'https://www.yahoo.sk/'];

		referrers.map((referrer) => {
			let acquisition = acquisitionProcessor.run(referrer);
			expect(acquisition).to.have.property('source', 'yahoo');
		});

		done();
	});

	it('should attribute to google / cpc', (done) => {	
		let acquisition = acquisitionProcessor.run('https://www.google.com/', 'http://www.example.com/page?utm_source=google&utm_medium=cpc&other_params=irrelevant');
		expect(acquisition).to.have.property('source', 'google');
		expect(acquisition).to.have.property('medium', 'cpc');
		
		done();
	});

	it('should attribute to facebook / social', (done) => {	
		let acquisition = acquisitionProcessor.run('https://www.facebook.com/', 'http://www.example.com/page');
		expect(acquisition).to.have.property('source', 'facebook');
		expect(acquisition).to.have.property('medium', 'social');
		
		done();
	});

	it('should attribute to twitter / social', (done) => {	
		let acquisition = acquisitionProcessor.run('https://www.twitter.com/', 'http://www.example.com/page');
		expect(acquisition).to.have.property('source', 'twitter');
		expect(acquisition).to.have.property('medium', 'social');
		
		done();
	});

	it('should attribute to google+ / social', (done) => {	
		let acquisition = acquisitionProcessor.run('https://plus.google.com/', 'http://www.example.com/page');
		expect(acquisition).to.have.property('source', 'google+');
		expect(acquisition).to.have.property('medium', 'social');
		
		done();
	});

	it('should attribute to blog.areferrer.com / referral', (done) => {	
		let acquisition = acquisitionProcessor.run('https://blog.areferrer.com/from-there', 'http://www.example.com/page');
		expect(acquisition).to.have.property('source', 'blog.areferrer.com');
		expect(acquisition).to.have.property('medium', 'referral');
		
		done();
	});

	it('should attribute to (direct) / (none)', (done) => {
		let acquisition = acquisitionProcessor.run(undefined, undefined);
		expect(acquisition).to.have.property('source', '(direct)');
		expect(acquisition).to.have.property('medium', '(none)');
		done();
	});

	it('should attribute source and medium from utms', (done) => {
		let acquisition = acquisitionProcessor.run(undefined, 'http://www.example.com/page?utm_source=source&utm_medium=medium&other_params=irrelevant');
		expect(acquisition).to.have.property('source', 'source');
		expect(acquisition).to.have.property('medium', 'medium');
		done();
	});
});