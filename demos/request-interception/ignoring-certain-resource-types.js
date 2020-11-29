const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, ignorignoreHTTPSErrors: true });  
  const [ page ] = await browser.pages()
  
  await page.setRequestInterception(true);

  page.on('request', request => {
    if (request.resourceType() === 'image') {
      request.abort();
    } else {
      request.continue();
    }
  });

  await page.goto('https://www.ikea.com/ru/ru/');
})();


