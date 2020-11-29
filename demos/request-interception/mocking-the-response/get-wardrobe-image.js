const path = require('path');
let counter = 0;

module.exports = () => {
  const imgPath = path.join(__dirname, `./ikea-wardrobes/${counter}.jpg`);
  counter === 19 ? counter = 0 : counter++;
  return imgPath;
};