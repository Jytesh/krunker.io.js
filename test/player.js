const { Client } = require('../src/index.js');
const client = new Client();

client.fetchPlayer('Trivm2002').then(d => {
    console.log(d);
    console.log(client.getPlayer(d.id));
    client.fetchPlayer('1s3k3b').then(console.log);
});