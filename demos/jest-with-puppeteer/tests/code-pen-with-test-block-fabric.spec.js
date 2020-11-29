const TEST = {
	name: 'TEST-001',
	description: 'You shuld be able to switch layout',
	featureTags: ['LAYOUT'],

	steps: {
		0: { description: 'Navigate to the main page' },
		1: { description: 'Type HTML' },
		2: { description: 'Copy paste CSS' },
		3: { description: 'Copy paste JS' },
		4: { description: 'Switch the layout' }
	}
};

const { testBlockWrapper, metricsCollector } = new TestBlockFabric(TEST);

const { setInitialState, returnToInitialState, pasteInto } = require('common-functions.js');
const code = require('../constants/code-strings');

beforeAll(async () => {
  await setInitialState();
});

afterAll(async () => {
  await metricsCollector.saveToDatabase();
  await returnToInitialState();
});

const { description, steps } = TEST;
let htmlTextArea, cssTextArea, jsTextArea;

describe(description, () => {

  test('Navigate to the main page', async () => await testBlockWrapper(steps[0], async () => {

    await metricsCollector.init();

    htmlTextArea = await page.waitForSelector('#box-html textarea');
    cssTextArea = await page.waitForSelector('#box-css textarea');
    jsTextArea = await page.waitForSelector('#box-js textarea');
  }));

  test('Type HTML', async () => await testBlockWrapper(steps[1], async () => {
    await htmlTextArea.type(code.html);
    expect(true).toBe(true);
  }));

  test('Copy paste CSS', async () => await testBlockWrapper(steps[2], async () => {
    await pasteInto(cssTextArea, code.css, page);
    expect(true).toBe(true);
  }));

  test('Copy paste JS', async () => await testBlockWrapper(steps[3], async () => {
    await pasteInto(jsTextArea, code.js, page);
    expect(true).toBe(true);
  }));

  test('Switch the layout', async () => await testBlockWrapper(steps[4], async () => {

    await (await page.waitForSelector('#view-switcher-button')).click();
    await (await page.waitForSelector('#right-layout')).click();
    await jsTextArea.click();

    expect(true).toBe(true);
  }));

});
