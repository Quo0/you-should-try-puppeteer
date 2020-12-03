const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../config/test-run-config.js');
const fileData = `
/*
  This config is autogenerated based on env variables
  You can set it globally to not import it in each place
*/

module.exports = {
  metrics: {
    enabled: true
  }
};

`;

fs.writeFileSync(filePath, fileData);
require('../services/test-block-fabric'); // Import is required to be able to store this fabbric globally. Muset be imported after create config step