const { setupElectron, teardownElectron } = require('common-functions.js');

beforeAll(async () => await setupElectron());
afterAll(async () => await teardownElectron());

describe('Testing ololo app', () => {
  
  const newUserName = 'Puppeteer';
  let mainPage, regPage;
  let signUpBtn;
  
  test('Main page with "Sign up" button should be displayed', async () => await wrapper(async () => {
    mainPage = page;
    signUpBtn = await mainPage.waitForSelector('#sign-up');
  }));
  
  test('Regestration page should be displayed after click on "Sign up" button', async () => await wrapper(async () => {
    await signUpBtn.click();    
    const regWindowTarget = await browser.waitForTarget(target => target.url().indexOf('registration.html') >= 0);
    regPage = await regWindowTarget.page();
    expect(regPage).toBeDefined();
  }));  

  test('Regestration page should should be closed after user submit the form', async () => await wrapper(async () => {
    const input = await regPage.waitForSelector('input');  
    const submitBtn = await regPage.waitForSelector('button');  
    await input.type('Puppeteer');
    await submitBtn.click();    

    await mainPage.waitFor(100);
    const pagesLength = (await browser.pages()).length;
    expect(pagesLength).toBe(1);    
  }));

  test('Main page should display the greeting message after user submit the form', async () => await wrapper(async () => {
    const greetingBlock = await mainPage.waitForFunction(selector => {
      const elem = document.querySelector(selector);
      return elem && elem.style.display === 'block' && elem;
    }, {}, '#greeting-block');
    
    const headerInnerText = await greetingBlock.$eval('h1', header => header.innerText);
    expect(headerInnerText).toBe(newUserName);
  }));

});
