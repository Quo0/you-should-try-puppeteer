const codeStrings = require('./code-strings.js');

const globalTimeouts = {
  jestTestBlockTimeout: process.env.JEST_TEST_BLOCK_TIMEOUT && +process.env.JEST_TEST_BLOCK_TIMEOUT || 60000
};

const errors = {
  jestTestBlockTimeoutExceeded: `Zzzzz... Timeout - Async callback was not invoked within the ${globalTimeouts.jestTestBlockTimeout}ms timeout specified by jest.setTimeout`
};

module.exports = {
  globalTimeouts,
  errors,
  codeStrings
};