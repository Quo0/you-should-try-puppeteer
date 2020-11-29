const puppeteer = require('puppeteer');
const code = require('./code-strings.js');
const { pasteInto } = require('./actions.js');

(async () => {
  const options = { headless: false, defaultViewport: null };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto('https://codepen.io/pen/', { waitUntil: 'domcontentloaded' });

  const htmlTextArea = await page.waitForSelector('#box-html textarea');
  const cssTextArea = await page.waitForSelector('#box-css textarea');
  const jsTextArea = await page.waitForSelector('#box-js textarea');

  await htmlTextArea.type(code.html);
  await pasteInto(cssTextArea, code.css, page);
  await pasteInto(jsTextArea, code.js, page);

  await (await page.waitForSelector('#view-switcher-button')).click();
  await (await page.waitForSelector('#right-layout')).click();
  await jsTextArea.click();
})();