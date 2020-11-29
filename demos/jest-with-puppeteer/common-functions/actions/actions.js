const pasteInto = async (target, text, page) => {
  await target.focus();
  await copyToClipboard(text, page);

  await page.keyboard.down('Control');
  await page.keyboard.down('V');
  await page.keyboard.up('Control');
  await page.keyboard.up('V');
};

const copyToClipboard = (text, page) => page.evaluate(t => {
  // Код выполняется в контексте браузера
  const copied = navigator.clipboard.writeText(t)
    .then(() => true)
    .catch(() => false);

  return copied; // Результат возвращается в контест Node.js
}, text);

module.exports = {
  pasteInto
};