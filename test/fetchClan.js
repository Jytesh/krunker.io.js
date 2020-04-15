const { Client } = require('../src/index.js');
const client = new Client();

client.fetchClan('T').then(d => {
    console.log(d);
    console.log(client.getClan('T'));
});
