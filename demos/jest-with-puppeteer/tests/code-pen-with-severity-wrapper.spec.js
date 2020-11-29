const { setInitialState, returnToInitialState } = require('common-functions.js');

beforeAll(async () => {
  await setInitialState();
});

afterAll(async () => {
  await returnToInitialState();
});

describe('Skip low severity test blocks', () => {

  const steps = {
    1: { description: 'All textareas should be displayed', severity: 'high' },
    2: { description: 'Text color should be light grey',   severity: 'low' }
  };

  test(steps[1].description, async () => await severityWrapper(steps[1], async () => { 
    await page.waitForSelector('#box-html textarea');
    await page.waitForSelector('#box-css textarea');
    await page.waitForSelector('#box-js textarea');
    await page.waitFor(5000); // to test JEST_TEST_BLOCK_TIMEOUT
  }));
  
  test(steps[2].description, async () => await severityWrapper(steps[2], async () => { 
    expect(false).toBe(true);
    // Should not fail if process.env.SEVERITY is set to 'low' 
  }));
  
}); 

console.log(
  "\n" +
  "..................................................................\n" +
  "     This test should fail unless you set low severity level\n\n" +
  "set SEVERITY=low\n\n\n" +
  "You can emulate stucked async function with the following command\n\n" +
  "set JEST_TEST_BLOCK_TIMEOUT=3000\n" +
  "``````````````````````````````````````````````````````````````````"
);