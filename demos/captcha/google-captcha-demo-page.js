const puppeteer = require('puppeteer');
const resolveCapthca = require('./functions/resolve-captcha.js');

const pathToExtension = require('path').join(__dirname, 'buster-extension');
const pageURL = 'https://www.google.com/recaptcha/api2/demo';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PATH_TO_CHROME || 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    headless: false,
    defaultViewport: null,
    slowMo: 60,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ]
  });
  
  const [ page ] = await browser.pages();
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  });
  
  await page.goto(pageURL);
  await page.waitFor(2000);
  await resolveCapthca(page);
})();

