const axios = require('axios');
const cheerio = require('cheerio');

const getHtml = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let htmLink = $('td a[href^="/Archive"][href$="htm"]').attr('href');
    if (htmLink === undefined) {
      return null;
    }
    htmLink = `https://www.sec.gov${htmLink}`;
    return htmLink;
  } catch (err) {
    return err;
  }
};

const getCount = (counter) => {
  if (counter >= 1 && counter <= 10) {
    return 10;
  } if (counter > 10 && counter <= 20) {
    return 20;
  } if (counter > 20 && counter <= 40) {
    return 40;
  } if (counter > 40 && counter <= 100) {
    return 100;
  }
  return 100;
};

const searchByTicker = async (tradingSymbol, start, interval) => {
  try {
    const searchWithInterval = getCount(interval);
    const { data } = await axios.get(`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${tradingSymbol}&type=&dateb=&owner=exclude&start=${start}&count=${searchWithInterval}`);
    const $ = cheerio.load(data);
    const filings = [];

    $('table > tbody > tr').each((_idx, el) => {
      const filing = [];
      $(el).find('td').each((i, td) => {
        const txt = $(td).text();
	    filing.push(txt);
      });
      let href = $(el).find('td > a[href^="/Archive"]').attr('href');
      if (href !== undefined) {
        href = `https://www.sec.gov${href}`;
        filing.push(href);
        filings.push(filing);
      }
    });
    const matchCount = (filings, interval) => filings.slice(0, interval);
    return matchCount(filings, interval);
  } catch (err) {
    return err;
  }
};

module.exports.searchByTicker = searchByTicker;
module.exports.getHtml = getHtml;
