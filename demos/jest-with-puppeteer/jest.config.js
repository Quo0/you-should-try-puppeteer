const defaultSuite = '**';
const timestamp = new Date().getTime();

module.exports = {
	verbose: true,
	preset: 'jest-puppeteer',
	globalSetup: '<rootDir>/jest-setup/global-setup.js',
	globalTeardown: '<rootDir>/jest-setup/global-teardown.js',
	setupFiles: ['<rootDir>/jest-setup/create-config.js'],
	setupFilesAfterEnv: ['<rootDir>/jest-setup/jest.setup.js'],
	modulePaths: [
		'<rootDir>/config/',
		'<rootDir>/constants/',
		'<rootDir>/common-functions/',
		'<rootDir>/utils/',
		'<rootDir>/services/',
		'<rootDir>/jest-setup/',
	],
	testMatch: [`<rootDir>/tests/${process.env.SUITE || defaultSuite}/*.spec.js`],
	reporters: [
		'default',
		['<rootDir>/node_modules/jest-html-reporters', { filename: `./reports/test-report-${timestamp}.html` }],
		['<rootDir>/node_modules/jest-html-reporters', { filename: './reports/test-report-latest.html' }]
	]
};


