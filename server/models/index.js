const { Records } = require('../../database');

const enterRecord = (record) => {
  Records.create(record)
    .then(() => {
      console.log('created');
    })
    .catch((err) => {
      console.log(err);
    });
};
/*
{
    tradingSymbol: record.tradingSymbol,
    filings: record.filings,
    fileDate: record.fileDate,
    description: record.description,
    htmlUrl: record.htmlUrl,
  }
*/

module.exports.enterRecord = enterRecord;
