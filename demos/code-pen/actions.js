const pasteInto = async (target, text, page) => {
  await target.click();
  const copied = await copyToClipboard(text, page);

  if (copied) {
    await page.keyboard.down('Control');
    await page.keyboard.down('V');
    await page.keyboard.up('Control');
    await page.keyboard.up('V');
  } else {
    await target.type(text);
  }
};

const copyToClipboard = (text, page) => page.evaluate(t => {
  // Код выполняется в контексте браузера
  const copied = navigator.clipboard.writeText(t)
    .then(() => true)
    .catch(() => false);

  return copied; // Результат возвращается в контекст Node.js
}, text);

module.exports = { pasteInto };

