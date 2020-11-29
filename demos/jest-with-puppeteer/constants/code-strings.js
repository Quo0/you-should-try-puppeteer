const html = `<div>
<p>
    <span id="w"></span>
    <span id="p"></span>
  </p>
  <p id="s"></p>
</div>
`;

const css = `
div {
  margin-top: 200px;
}

p {
  font-family: monospace;
  font-size: 40px;
  padding: 5px 10px;
  margin: 10px 0;
  word-spacing: -5px;
}

#p {
  color: #00946f;
}

#s{
  text-align: center;
}
`;

const js = `
const welcomeP = document.getElementById('w');
const puppeteerS = document.getElementById('p');
const smileP = document.getElementById('s');

const typeText = async (target, text, delay = 50) => {
  for (const char of text.split('')) {
    await insertCharWithDelay(target, char, delay);
  }
};
const insertCharWithDelay = (target, char, delay) => new Promise(resolve => {
  const shouldPause = '.,!'.indexOf(char) >= 1;
  setTimeout(() => {
    target.innerHTML += char;
    shouldPause ? setTimeout(() => resolve(), 500) : resolve();
  }, delay);
}); 

(async () => {
  await typeText(welcomeP, 'Hello! My name is ');
  await typeText(puppeteerS, 'Puppeteer');
  await typeText(smileP, '_(^_^)/');
})();



`;

module.exports = { html, css, js };