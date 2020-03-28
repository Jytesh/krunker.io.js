const { Client } = require('../src/index.js');
const client = new Client();

client.fetchPlayer('kiiturii').then(console.log);