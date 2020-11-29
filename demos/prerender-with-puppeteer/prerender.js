const puppeteer = require('puppeteer');
const userAgentParser = require('useragent');
const mainSelectorTimeout = 5000;

const CACHE = new Map();

const prerender = async ({ url, mainSelector }) => {
  try {

    if (CACHE.has(url)) {
      return { html: CACHE.get(url) };
    }

    const start = Date.now();

    const page = await getNewPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    await waitForDynamicContent(page, mainSelector);
    await removeAllScriptTags(page);

    const html = await page.content();
    CACHE.set(url, html);
    const ttr = Date.now() - start;

    return { html, ttr };

  } catch(error) {
    if (error instanceof puppeteer.errors.TimeoutError) {
      error.isTimeoutError = true;
    }
    return { error };
  }
};

let browser;
const setupBrowser = async () => { browser = await puppeteer.launch() };

const getNewPage = async () => {
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', filterBlacklistedResources);

  return page;
};

const filterBlacklistedResources = request => {

  const blacklist = {
    resourceTypes: [
      'image',
      'media',
      'font',
      'stylesheet'
    ],
    resources: [
      'google-analytics',
      'analytics',
      'metrika'
    ]
  };

  const requestUrl = request.url().split('?')[0].split('#')[0];

  if (
    blacklist.resourceTypes.indexOf(request.resourceType()) !== -1 ||
    blacklist.resources.some(resource => requestUrl.indexOf(resource) !== -1)
  ) {
    request.abort();
  } else {
    request.continue();
  }
};

const waitForDynamicContent = (page, mainSelector, timeout = mainSelectorTimeout) => {
  return page.waitForSelector(mainSelector, { timeout });
};

const removeAllScriptTags = (page) => page.evaluate(() => {
  const scriptTags = document.querySelectorAll('script');
  scriptTags.forEach(e => e.remove());
});

const isBot = req => {
  const userAgent = req.headers['user-agent']
  if (process.env.IS_BOT) { return true; }

  const agent = userAgentParser.is(userAgent);
  return !agent.webkit && !agent.opera && !agent.ie &&
      !agent.chrome && !agent.safari && !agent.mobile_safari &&
      !agent.firefox && !agent.mozilla && !agent.android;
};

module.exports = { prerender, isBot, setupBrowser };