const puppeteer = require('puppeteer-core');
const killProcess = require('tree-kill');
const { exec } = require('child_process');
const { PATH_TO_ELECTRON, SLOW_MO } = process.env;

const launchElectronApp = () => {
  const command = PATH_TO_ELECTRON || 'electron .';
  return exec(command).pid;
};

// const { TEST_BUILDED_VERSION, PATH_TO_ELECTRON, SLOW_MO } = process.env;

// const launchElectronApp = () => {
//   const command = TEST_BUILDED_VERSION
//                 ? PATH_TO_ELECTRON || 'C:/Users/Quo0/AppData/Local/Programs/electron-with-jest-with-puppeteer/ololo.exe'
//                 : 'electron .';
  
//   return exec(command).pid;
// };

let processId;

const setupElectron = async () => {
  processId = launchElectronApp();

  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:7777',
    defaultViewport: null,
    slowMo: SLOW_MO ? +SLOW_MO : 0,
  });

  global.puppeteer = puppeteer;
  global.browser = browser;
  global.page = (await browser.pages())[0];
};

const teardownElectron = async () => {
  await global.browser.disconnect();
  await new Promise(resolve => killProcess(processId, () => resolve()));
};

module.exports = {
  setupElectron,
  teardownElectron
};