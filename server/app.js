const express = require('express');
const path = require('path');
// const models = require('./models');
const controllers = require('./controllers');

const app = express();
app.use('/', express.static(path.resolve(__dirname, '../client/dist')));

app.get('/api/search', async (req, res) => {
  try {
    const { tradingSymbol } = req.query;
    const data = await controllers.webScraping.searchByTicker(tradingSymbol);
    res.send(`tradingSymbol: ${tradingSymbol}, data: ${data}`);
  } catch (err) {
    res.send(err);
  }
});

app.get('/api/htm', async (req, res) => {
  try {
    const { indexUrl } = req.query;
    const data = await controllers.webScraping.getHtml(indexUrl);
    res.send(`indexUrl: ${indexUrl}, data: ${data}`);
  } catch (err) {
    res.send(err);
  }
});

module.exports = app;
