const { setInitialState, returnToInitialState } = require('common-functions.js');

beforeAll(async () => {
  await setInitialState();
});

afterAll(async () => {
  await returnToInitialState();
});

describe('Skip next test blocks on error', () => {

  test('All textareas should be displayed', async () => await wrapper(async () => { 
    await page.waitForSelector('#box-html textarea');
    await page.waitForSelector('#box-css textarea');
    await page.waitFor(5000); // to test JEST_TEST_BLOCK_TIMEOUT
  }));
  
  test('This step should fail', async () => await wrapper(async () => { 
    expect(false).toBe(true)
  }));

  test('This step should take a lot of time now...', async () => await wrapper(async () => { 
    await page.waitForSelector('any bullshit', { timeout: 180000 });
  }));

  test('This step should take a lot of time too...', async () => await wrapper(async () => { 
    await page.waitForSelector('any bullshit', { timeout: 180000 });
  }));

});   

console.log(
  "\n" +
  "..................................................................\n" +
  "              This test should fail, don't warry =)\n\n" +
  "The main trick is that you will not wait 6 min to finish the test!\n" +
  "``````````````````````````````````````````````````````````````````"
);



