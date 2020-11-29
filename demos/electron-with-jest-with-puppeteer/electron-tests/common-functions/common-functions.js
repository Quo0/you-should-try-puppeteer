const { setupElectron, teardownElectron } = require('./electron-setup/electron-setup.js');
const { failTheTest } = require('./utils');

module.exports = {
  setupElectron,
  teardownElectron,
  failTheTest
};