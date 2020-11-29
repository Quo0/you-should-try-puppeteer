const { setInitialState, returnToInitialState } = require('./browser-setup/browser-setup.js');
const { failTheTest } = require('./utils');
const { pasteInto } = require('./actions/actions.js');

module.exports = {
  setInitialState,
  returnToInitialState,
  failTheTest,
  pasteInto,
};