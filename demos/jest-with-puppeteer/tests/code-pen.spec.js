const { codeStrings } = require('constants.js');
const { setInitialState, returnToInitialState, pasteInto } = require('common-functions.js');

beforeAll(async () => {
  await setInitialState();
});

afterAll(async () => {
  await returnToInitialState();
});

describe('Test description', () => {
  let htmlTextArea, cssTextArea, jsTextArea;
  
  test('All textareas should be displayed', async () => {
    htmlTextArea = await page.waitForSelector('#box-html textarea');
    cssTextArea = await page.waitForSelector('#box-css textarea');
    jsTextArea = await page.waitForSelector('#box-js textarea');
  });

  test('HTML textarea should be populated with code', async () => { 
    await htmlTextArea.type(codeStrings.html);
    expect(true).toBe(true);
  });

  test('CSS textarea should be populated with code', async () => {
    await pasteInto(cssTextArea, codeStrings.css, page);
    expect(true).toBe(true);
  });

  test('JS textarea should be populated with code', async () => {
    await pasteInto(jsTextArea, codeStrings.css, page);
    expect(true).toBe(true);
  });
});

console.log(
  "\n" +
  "............................\n" +
  "Try with different browsers!\n\n" +
  "set TARGET_BROWSE=firefox\n" +
  "set TARGET_BROWSE=edge\n" +
  "set TARGET_BROWSE=chrome\n" +
  "````````````````````````````"
);


