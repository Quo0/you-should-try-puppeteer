const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const clearDirectory = (directory = path.join(__dirname, 'downloads')) => {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
};
const getNameFromUrl = url => url.split('/').pop().replace('?', ''); 
const isAppropriate = fileName => ['jpg', 'png', 'svg', 'gif'].indexOf(fileName.split('.').pop()) >= 0;

(async () => {
  clearDirectory();
  const browser = await puppeteer.launch({ headless: !!process.env.HEADLESS, ignorignoreHTTPSErrors: true });  
  const page = (await browser.pages()).pop();
  
  const downloadImageInterceptor = response => {

    if (response.request().resourceType() === 'image') {

      const fileName = getNameFromUrl(response.url());

      if (isAppropriate(fileName)) {
        const newFilePath = path.join(__dirname, 'downloads', fileName);
        response.buffer().then(file => fs.writeFile(newFilePath, file, () => {}));        
      }
    }
  };

  page.on('response', downloadImageInterceptor);  
  
  await page.goto('https://www.ikea.com/ru/ru/');
})();


