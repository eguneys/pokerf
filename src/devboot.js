require('./index.css');

const main = require('./main');
const tests = require('./test');

module.exports = main.app;
module.exports.Tests = tests.Tests;
