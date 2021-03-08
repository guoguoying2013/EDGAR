/* eslint-disable import/no-mutable-exports */
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 100 }, // below normal load
    { duration: '1m', target: 200 }, // normal load
    { duration: '1m', target: 100 },
    { duration: '1m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3000/api/search';

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}?tradingSymbol=APPL&start=0`,
    ],
    [
      'GET',
      `${BASE_URL}?tradingSymbol=MSFT&start=0`,
    ],
    [
      'GET',
      `${BASE_URL}?tradingSymbol=ABNB&start=0`,
    ],
  ]);

  sleep(1);
}

// k6 run k6Script.js;
// k6 run --vus 10 --duration 30s script.js
