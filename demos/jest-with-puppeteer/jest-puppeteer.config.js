const { TARGET_BROWSER, PATH_TO_EDGE, PATH_TO_CHROME, HEADLESS, SLOW_MO } = process.env;
const headless = HEADLESS === 'true';

const args = [
	'--no-sandbox',
	'--ignore-certificate-errors',
];
headless && args.push('--remote-debugging-address=0.0.0.0', '--remote-debugging-port=9222');

const getTargetBrowser = () => {
  if (TARGET_BROWSER) {
		const b = TARGET_BROWSER.toLowerCase();
    return b === 'firefox'  ? 'firefox'
         : b === 'chromium' ? 'chromium'
         : b === 'chrome'   ? !headless ? 'chrome' : _throw(`Can't run Chrome in headless mode`)
         : b === 'edge'     ? !headless ? 'edge' : _throw(`Can't run Edge in headless mode`)
         : (() => { _throw(`Incorrect process.env.TARGET_BROWSER value: ${TARGET_BROWSER}`) })()
	} else {
    return 'chromium';
	}
};
const _throw = message => { throw new Error(message) };

const targetBrowser = getTargetBrowser();

const config = {
  launch: {
    headless,
    args,
    slowMo: SLOW_MO ? +SLOW_MO : 0,
    ignoreHTTPSErrors: targetBrowser === 'firefox' ? false : true,
    // Firefox will throw an error. Related issue: https://github.com/puppeteer/puppeteer/issues/5076
  },
  exitOnPageError: false
};

switch (targetBrowser) {
  case 'edge':
    config.launch.executablePath = PATH_TO_EDGE || 'C:/Program Files (x86)/Microsoft/Edge Beta/Application/msedge.exe';
    break;

  case 'chrome':
    config.launch.executablePath = PATH_TO_CHROME || 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
    break;

  case 'firefox':
    config.launch.product = 'firefox';
    break;

  case 'chromium':
  default:
    config.launch.product = 'chrome';
}

module.exports = config;

/*
  So in the end you will have either

        const config = {
          browser: 'firefox or chromium',

          launch: {
            headless,
            args,
            slowMo: SLOW_MO ? +SLOW_MO : 0,
            ignoreHTTPSErrors: true,
          },
          exitOnPageError: false
        };

  or

        const config = {
          launch: {
            executablePath: 'path to browser',

            headless,
            args,
            slowMo: SLOW_MO ? +SLOW_MO : 0,
            ignoreHTTPSErrors: true,
          },
          exitOnPageError: false
        };
*/





