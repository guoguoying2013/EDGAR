const request = require('supertest');
const app = require('../server/app');
const db = require('../database');

describe('Test the /api/search end point', () => {
  test('It should response the GET method', async (done) => {
    await request(app)
      .get('/api/search')
      .query({ tradingSymbol: 'AAPL' })
      .expect(200);
    done();
  });

  test('It should response status code 400 if trading symbol is invalid', async (done) => {
    await request(app)
      .get('/api/search')
      .query({ tradingSymbol: 'APPLLLLLLL' })
      .expect(400);
    done();
  });

  test('It should response status code 400 invalid input if start point is less than 0', async (done) => {
    await request(app)
      .get('/api/search')
      .query({ tradingSymbol: 'AAPL', start: -1 })
      .expect(400);
    done();
  });

  afterAll(async (done) => {
    await db.orm.close();
    done();
  });
});
