const { slowClick } = require('./slow-actions.js');

const frameUrls = {
  anchor: 'https://www.google.com/recaptcha/api2/anchor',
  pazle: 'https://www.google.com/recaptcha/api2/bframe'
};
const selectors = {
  notARobotCheckbox: '#recaptcha-anchor',
  solveCaptchaBtn: '#solver-button',
  puzleIFrame: 'iframe[title="recaptcha challenge"]'
};

const resolveCapthca = async (page) => {
  const { checkboxFr, pazleFr } = await getFrames(page);

  const checkBox = await checkboxFr.waitForSelector(selectors.notARobotCheckbox);
  await slowClick(checkBox, page);

  const solverBtn = await pazleFr.waitForSelector(selectors.solveCaptchaBtn);
  await slowClick(solverBtn, page);

  await waitForCaptchaDisappeared(page);
};

const getFrames = (page) => new Promise(async (resolve, reject) => {
  setTimeout(() => reject('Captcha frames were not found'), 5000);

  (async function cycle() {
    const { checkboxFr, pazleFr } = await findFrames(page);
    if (checkboxFr && pazleFr) {
      resolve({ checkboxFr, pazleFr });
    } else {
      setTimeout(cycle, 100);
    }
  })();
});

const findFrames = (page) => {
  const { checkboxFr, pazleFr } = page.frames().reduce((acc, curFrame) => {
    if (curFrame.url().startsWith(frameUrls.anchor)) {
      acc.checkboxFr = curFrame;
      return acc;
    }
    if (curFrame.url().startsWith(frameUrls.pazle)) {
      acc.pazleFr = curFrame;
      return acc;
    }
    return acc;
  }, {});

  return { checkboxFr, pazleFr };
};

const waitForCaptchaDisappeared = async (page) => {
  const pageFunction = (iframeSelector) => new Promise(resolve => {
    const element = document.querySelector(iframeSelector);

    const observer = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) {
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(element);
  })

  return page.evaluate(pageFunction, selectors.puzleIFrame);
};

module.exports = resolveCapthca;