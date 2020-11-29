const puppeteer = require('puppeteer');
const fs = require('fs');
const getWardrobeImage = require('./get-wardrobe-image');
const { request } = require('http');
const ikeaWardrobesURL = 'https://www.ikea.com/ru/ru/cat/shkafy-i-shkafy-kupe-19053/';

(async () => {
  const browser = await puppeteer.launch({ headless: false, ignorignoreHTTPSErrors: true, defaultViewport: null });
  const page = (await browser.pages()).pop();

  await page.setRequestInterception(true);

  const makeIkeaStylish = request => {
    if (isWardrobeImgRequest(request)) {

      fs.readFile(getWardrobeImage(), (_err, dataAsBuffer) => {
        request.respond({
          status: 200,
          contentType: 'image/png',
          body: dataAsBuffer
        });
      });
    } else {
      request.continue();
    }
  };

  page.on('request', makeIkeaStylish);

  await page.goto(ikeaWardrobesURL);
})();

function isWardrobeImgRequest(request) {
  if (request.resourceType() !== 'image') {
    return false;
  }

  const url = request.url();

  return url.indexOf('images/products') >= 0 || url.indexOf('ngkadam') >= 0;
}