const express = require('express');
const path = require('path');
// const models = require('./models');
const controllers = require('./controllers');

const app = express();
app.use('/', express.static(path.resolve(__dirname, '../client/dist')));

app.get('/api/search', async (req, res) => {
  try {
    const { tradingSymbol, start, interval } = req.query;
    console.log(tradingSymbol, start, interval);
    const data = await controllers.webScraping.searchByTicker(tradingSymbol, start, interval);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

app.get('/api/htm', async (req, res) => {
  try {
    const { indexUrl } = req.query;
    const data = await controllers.webScraping.getHtml(indexUrl);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

module.exports = app;
