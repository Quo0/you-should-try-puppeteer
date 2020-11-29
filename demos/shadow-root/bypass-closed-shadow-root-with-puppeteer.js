const puppeteer = require('puppeteer');
const pageURL = require('path').join(__dirname, 'index.html');

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null, slowMo: 30 });
  const [ page ] = await browser.pages();

  await page.evaluateOnNewDocument(() => {
    Element.prototype._attachShadow = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function() {
      return this._attachShadow({ mode: 'open' });
    }
  });

  await page.exposeFunction('typeWithPuppeteer', async (text) => {
    await page.keyboard.type(text);
  });

  const typeToCustomElement = ({ path, text, page }) => page.evaluate((pth, txt) => {

    const findElement = (pth) => pth.reduce((prevElement, currElement) => {

      if (!prevElement) { return document.querySelector(currElement.name); }

      if (
        prevElement.shadowRoot && !currElement.isCustomElement ||
        prevElement.shadowRoot && !currElement.isSlotted
      ) {
        return prevElement.shadowRoot.querySelector(currElement.name);
      }
      if (
        !prevElement.shadowRoot ||
          prevElement.shadowRoot && currElement.isSlotted
      ) {
        return prevElement.querySelector(currElement.name);
      }

    }, null);

    const element = findElement(pth);
    element.select();
    return typeWithPuppeteer(txt);

  }, path, text);

  await page.goto(pageURL);
  await page.waitFor(2000);

  await typeToCustomElement({
    path: [
      { name: 'custom-div', isCustomElement: true },
      { name: 'custom-input', isCustomElement: true, isSlotted: true },
      { name: 'input' }
    ],
    text: 'slotted custom element',
    page
  });

  await typeToCustomElement({
    path: [
      { name: 'custom-div', isCustomElement: true },
      { name: 'custom-input', isCustomElement: true },
      { name: 'input' }
    ],
    text: 'Are you sure, my brother ?',
    page
  });

  await page.waitFor(2000);
  await page.evaluate(() => {
    document.querySelector('custom-div').shadowRoot.firstElementChild.innerHTML = `
      <h1 style="margin: 5px">YES, YOU CAN</h1>
      <p style="margin: 0">access shadow-root with Puppeteer</p>
    `;
  });
})();
