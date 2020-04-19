const { Client } = require('../src/index.js');
const client = new Client();

client.fetchWeekly().then(console.log);