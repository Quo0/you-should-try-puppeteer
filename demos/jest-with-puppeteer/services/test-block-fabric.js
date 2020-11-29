const { MetricsCollector } = require('./metrics-collector');
const { globalTimeouts, errors } = require('../constants/constants');

class TestBlockFabric {
	constructor(test) {
		this.test = test;
		this.testBlockWrapper = testBlockWrapper.bind(this);
		this.metricsCollector = new MetricsCollector(test.name, test.featureTags);

		this.criticalError = null;
	};
}

const estimateAndHandleError = (severity = 2, error) => {
	switch (severity) {
		case 0:
			break;

		case 1:
		case 'low':
			console.warn(error);
			break;

		case 2:
		case 'high':
		default:
			console.error(error);

			this.metricsCollector.preventSaveToDatabase();
			this.criticalError = error;

			throw error;
	}
}

const failTheTest = reason => expect(reason ? reason : 'Test was manually failed!').toBe('/(x_X)_');

const testBlockWrapper = async function(stepConfig, fn) {
	/*
		By default JEST is running each test() block one after another regardless any expect() has failed or any error has occured.
		This wrapper function allow us to detect the error in any test() and skip all the next blocks.

		test('Test name', async () => await testBlockWrapper(stepConfig, async () => {
			await action();
			await expectation();
		}));
	*/
	if (this.criticalError) { return failTheTest(); }

	let rejectTimeoutId;

	const rejectPromise = new Promise((_, reject) => {
		rejectTimeoutId = setTimeout(() => reject(errors.jestTestBlockTimeoutExceeded), globalTimeouts.jestTestBlockTimeout);
	});

	try {

		await Promise.race([
			fn(),
			rejectPromise
		]);

		await this.metricsCollector.collectChunk(stepConfig.description);

	} catch (error) {
		estimateAndHandleError(stepConfig.severity, error);
	} finally {
		clearTimeout(rejectTimeoutId);
	}
};

global.TestBlockFabric = TestBlockFabric;
module.exports = { TestBlockFabric };