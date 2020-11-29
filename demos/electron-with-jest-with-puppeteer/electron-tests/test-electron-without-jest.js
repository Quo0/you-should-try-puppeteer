const puppeteer = require('puppeteer-core');

(async () => {
  try {
    
    const browser = await puppeteer.connect({
      browserURL: 'http://127.0.0.1:7777',
      defaultViewport: null
    });

    const [ mainPage ] = await browser.pages();
      
    /**
      Or use browserWSEndpoint:

      const axios = require('axios');

      const getBrowserWsEndpoint = async () => {
        const url = `http://127.0.0.1:7777/json/version`;
        const response = await axios.get(url);
        return response.data.webSocketDebuggerUrl;
      };  
      const browserWSEndpoint = await getBrowserWsEndpoint();
    
      const browser = await puppeteer.connect({
        browserWSEndpoint,
        defaultViewport: null
      });
    
      const browser = await puppeteer.connect({
        browserURL: 'http://127.0.0.1:7777',
        defaultViewport: null
      });  
    */
    
    const signUpBtn = await mainPage.waitForSelector('#sign-up');
    await signUpBtn.click();
  
    const regWindowTarget = await browser.waitForTarget(target => {
      return target.url().indexOf('registration.html') >= 0;
    });
    const regPage = await regWindowTarget.page();
  
    const input = await regPage.waitForSelector('input');  
    const submitBtn = await regPage.waitForSelector('button');  
    await input.type('Puppeteer');
    await submitBtn.click();
  
  } catch (_) {
    console.log(
      "............................................................\n" +
      "         Looks like you forgot to start the App!\n\n" +
      "Please 'cd electron-with-jest-with-puppeteer' in the new tab\n" +
      "And execute electron app 'npm run start'\n\n" +
      "Or launch the builded version befor executing the script\n" +
      "````````````````````````````````````````````````````````````"
    );    
  }
})();


