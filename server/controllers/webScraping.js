const axios = require('axios');
const cheerio = require('cheerio');

const getHtml = async (url) => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  let htmLink = $('td a[href^="/Archive"][href$="htm"]').attr('href');
  if (htmLink === undefined) {
    return null;
  }
  htmLink = `https://www.sec.gov${htmLink}`;
  return htmLink;
};

const searchByTicker = async (tradingSymbol, start, interval) => {
  try {
    const { data } = await axios.get(`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${tradingSymbol}&type=&dateb=&owner=exclude&start=${start}&count=${interval}`);
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
    return filings;
  } catch (err) {
    return err;
  }
};

module.exports.searchByTicker = searchByTicker;
module.exports.getHtml = getHtml;
