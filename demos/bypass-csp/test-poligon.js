const puppeteer = require('puppeteer');
const pageURL = 'https://yandex.ru/';

(async () => {

  const browser = await puppeteer.launch({ headless: false, defaultViewport: null, slowMo: 30 });
  const [ page ] = await browser.pages();

  await page.setBypassCSP(true);
  await page.goto(pageURL);
  await page.addScriptTag({ path: './injection.js' });

})();
