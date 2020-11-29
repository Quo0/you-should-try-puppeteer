const defaultSuite = '**';
const timestamp = new Date().getTime();

module.exports = {
	verbose: true,
	setupFilesAfterEnv: ['<rootDir>/electron-tests/jest-setup/jest.setup.js'],
	modulePaths: [
		'<rootDir>/electron-tests/constants/',
		'<rootDir>/electron-tests/common-functions/',
		'<rootDir>/electron-tests/jest-setup/',
	],
	testMatch: [`<rootDir>/electron-tests/tests/${process.env.SUITE || defaultSuite}/*.spec.js`],
	reporters: [
		'default',
		['<rootDir>/node_modules/jest-html-reporters', { filename: `./electron-tests/reports/test-report-${timestamp}.html` }],
		['<rootDir>/node_modules/jest-html-reporters', { filename: './electron-tests/reports/test-report-latest.html' }]
	]
};


