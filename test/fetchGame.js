const krunker = require('../src/index.js');
const client = new krunker.Client();

client.fetchGame('https://krunker.io/?game=FRA:u7wpt').then(console.log);
