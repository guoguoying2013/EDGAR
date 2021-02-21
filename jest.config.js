const path = require('path');

module.exports = {
  setupFilesAfterEnv: [path.resolve(__dirname, 'test/setup.js')],
  testEnvironment: 'node',
};
