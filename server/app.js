const express = require('express');
const path = require('path');
const models = require('./models');
const controllers = require('./controllers');

const app = express();
app.use('/', express.static(path.resolve(__dirname, '../client/dist')));

app.get('/api/search', async (req, res) => {
  try {
    const { tradingSymbol, start, interval } = req.query;
    if (Number(start) < 0 || Number(interval) < 1) {
      res.status(400).send('Invalide Input, start >= 0, interval > 1');
    } else {
      const data = await controllers.webScraping.searchByTicker(tradingSymbol, start, interval);
      if (data.length === 0) {
        res.status(400).send(`Couldn't find any filing associated with this trading symbol ${tradingSymbol}`);
      } else {
        res.status(200).send(data);
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/htm', async (req, res) => {
  try {
    const { indexUrl, info } = req.query;
    console.log(info);
    const data = await controllers.webScraping.getHtml(indexUrl);
    if (data === null) {
      res.status(204).send(`Couldn't find a html link at ${indexUrl}`);
    }
    const record = JSON.parse(info);
    record.htmlUrl = data;
    models.enterRecord(record);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
