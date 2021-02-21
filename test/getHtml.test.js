const request = require('supertest');
const app = require('../server/app');
const db = require('../database');

describe('Test the /api/htm end point', () => {
  test('It should response the GET method', async (done) => {
    await request(app)
      .get('/api/html')
      .query({
        indexUrl: 'https://www.sec.gov/Archives/edgar/data/320193/000119312521044816/0001193125-21-044816-index.htm',
        info: JSON.stringify({
          tradingSymbol: 'test', filings: 'test', fileDate: 'test', description: 'test',
        }),
      })
      .expect(200);
    done();
  });

  test('It should response status code 204 if no html file link is found', async (done) => {
    await request(app)
      .get('/api/html')
      .query({
        indexUrl: 'https://www.sec.gov/Archives/edgar/data/320193/000083423721007542/0000834237-21-007542-index.htm',
        info: JSON.stringify({
          tradingSymbol: 'test', filings: 'test', fileDate: 'test', description: 'test',
        }),
      })
      .expect(204);
    done();
  });

  afterAll(async (done) => {
    await db.orm.close();
    done();
  });
});
