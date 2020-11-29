const setInitialState = async () => {
  global.criticalError = undefined;
  await page.goto('https://codepen.io/pen/');
  // await page.goto('https://codepen.io/pen/', { waitUntil: 'domcontentloaded' });
};

const returnToInitialState = async () => {
  // returning to initial state
};

module.exports = {
  setInitialState,
  returnToInitialState
};