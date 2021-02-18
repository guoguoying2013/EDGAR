const express = require('express');
// const models = require('./models');
const controllers = require('./controllers');

const app = express();

app.get('/api/search', async (req, res) => {
  const { tradingSymbol } = req.query;
  const data = await controllers.webScraping.searchByTicker(tradingSymbol);
  res.send(`tradingSymbol: ${tradingSymbol}, data: ${data}`);
});

module.exports = app;
