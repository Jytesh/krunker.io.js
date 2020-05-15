const krunker = require('../src/index.js');
const client = new krunker.Client();

client
    .fetchItemSales('Vantablack')
    .then(console.log);
