const puppeteer = require('puppeteer');
const resolveCapthca = require('./functions/resolve-captcha.js');
const { slowType } = require('./functions/slow-actions.js');

const busterExtension = require('path').join(__dirname, 'buster-extension');
const pageURL = 'https://old.reddit.com/login';
const selectors = {
  username: '#user_reg',
  password: '#passwd_reg',
  confirmP: '#passwd2_reg',
  email: '#email_reg'
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    slowMo: 30,
    args: [
      `--disable-extensions-except=${busterExtension}`,
      `--load-extension=${busterExtension}`,
      '--disable-features=site-per-process' 
      // OOPIF issue: https://github.com/puppeteer/puppeteer/issues/2548
    ]
  });

  const [ page ] = await browser.pages();

  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false
    });
  }); 

  await page.goto(pageURL);  
  await slowType(selectors.username, '(^_^)', page);
  await slowType(selectors.password, 'qwerty12345', page);
  await slowType(selectors.confirmP, 'qwerty12345', page);
  await resolveCapthca(page);
  await slowType(selectors.email, 'reCaptcha is resolved!', page, 0);
})();