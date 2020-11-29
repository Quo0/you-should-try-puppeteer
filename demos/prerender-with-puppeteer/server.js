const express = require('express');
const { prerender, isBot, setupBrowser } = require('./prerender.js');

const build = {
  path: '/app/build',
  mainSelector: '.news-list'
};

const PATHS = {
  indexHtml: __dirname + build.path + '/app.html',
  serverErrorHtml: __dirname + '/public/server-error.html'
};

const app = express();

app.use(express.static(__dirname + build.path));

app.get('/', async (req, res) => {
  try {

    if (!isBot(req)) {
      return res.status(200).sendFile(PATHS.indexHtml);
    }

    const url = `${req.protocol}://${req.get('host')}/app.html`;
    const mainSelector = build.mainSelector;

    const { error, html, ttr } = await prerender({ url, mainSelector });

    if (error) { throw error };

    res.set(
      'Server-Timing',
      `Prerender;dur=${ttr};desc="Headless render time (ms)"`
    );

    res.status(200).send(html);

  } catch (error) {
    console.warn(error);

    error.isTimeoutError
        ? res.status(200).sendFile(PATHS.indexHtml)
        : res.status(500).sendFile(PATHS.serverErrorHtml);
  }
});

app.listen(8080, async () => {
  await setupBrowser();
  console.log('Server started at port 8080.');
});