const slowType = async (selectorOrHandle, text, page, timeout = 2000) => {
  const handle = typeof selectorOrHandle === 'string'
               ? await page.waitForSelector(selectorOrHandle)
               : selectorOrHandle;

  await page.waitFor(timeout);
  await handle.hover();
  await page.waitFor(timeout / 10);
  await handle.type(text);    
};

const slowClick = async (selectorOrHandle, page, timeout = 2000) => {
  const handle = typeof selectorOrHandle === 'string'
               ? await page.waitForSelector(selectorOrHandle)
               : selectorOrHandle;

  await page.waitFor(timeout);
  await handle.hover();
  await page.waitFor(timeout / 10);
  await handle.click();    
};

module.exports = { slowType, slowClick };