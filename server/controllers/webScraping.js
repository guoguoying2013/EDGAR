/* eslint-disable no-console */
const axios = require('axios');
const cheerio = require('cheerio');

// db example https://www.sec.gov/forms

const getHtml = (url) => {
  // example url: https://www.sec.gov/Archives/edgar/data/320193/000162828017004790/a10-qq22017412017.htm
  // get more info
  // https://www.sec.gov/ix?doc=/Archives/edgar/data/320193/000032019321000010/aapl-20201226.htm
};

const validateTradingSymbol = (tradingSymbol) => {
  // validate trading symbol
};

const searchByTicker = async (tradingSymbol) => {
  const { data } = await axios.get(`https://www.sec.gov/cgi-bin/browse-edgar?CIK=${tradingSymbol}&owner=exclude&action=getcompany`);
  const $ = cheerio.load(data);
  const filings = [];

  $('table > tbody > tr').each((_idx, el) => {
    const filing = [];
    $(el).find('td').each((i, td) => {
      const txt = $(td).text();
      filing.push(txt);
    });
    const href = $(el).find('td > a[href^="/Archive"]').attr('href');
    filing.push(href);
    filings.push(filing);
  });

  filings.splice(0, 5);
  filings.pop();

  return filings;
};

module.exports.searchByTicker = searchByTicker;
