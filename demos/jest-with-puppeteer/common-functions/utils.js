const { globalTimeouts, errors } = require('../constants/constants.js');
const jestTestBlockTimeout = globalTimeouts.jestTestBlockTimeout - 2000;

const failTheTest = reason => expect(reason ? reason : 'Test was manually failed!').toBe('_(x_x)_');

const wrapper = async (fn) => {
	if (global.criticalError) { return failTheTest(); }	
	
	let rejectTimeoutId;
	const rejectPromise = new Promise((_, reject) => {
		rejectTimeoutId = setTimeout(() => reject(errors.jestTestBlockTimeoutExceeded), jestTestBlockTimeout);
	});

  try {
		await Promise.race([
			fn(),
			rejectPromise
		]);
	} catch (error) {
		global.criticalError = error; // <-- Don't forget to clear it in beforeAll()
		throw error;
	} finally {
		clearTimeout(rejectTimeoutId);
	}
};

const severityWrapper = async ({ description, severity = 'high' }, fn) => {	
	if (global.criticalError) { return failTheTest(); }
	
	let rejectTimeoutId;
	const rejectPromise = new Promise((_, reject) => {
		rejectTimeoutId = setTimeout(() => reject(errors.jestTestBlockTimeoutExceeded), jestTestBlockTimeout);
	});

  try {
		await Promise.race([
			fn(),
			rejectPromise
		]);
	} catch (error) {
		if (canSkipError(error, severity)) {
			handleLowPriorityError(error, description);
		} else {
			global.criticalError = error; // <-- Don't forget to clear it in beforeAll()
			throw error;
		}
	} finally {
		clearTimeout(rejectTimeoutId);
	}
};

const canSkipError = (error, severity) => {
	if (error === errors.jestTestBlockTimeoutExceeded) { return false; }
	// Any additional error assessment
	return process.env.SEVERITY === 'low' && severity !== 'high';	
};
 
const handleLowPriorityError = (error, description) => {
	console.warn(`\nTest block "${description}" was skiped.\n${error.stack}`);
	// Manually update the report
};

global.wrapper = wrapper;
global.severityWrapper = severityWrapper;

module.exports = { failTheTest };