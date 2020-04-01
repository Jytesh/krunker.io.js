const { Client } = require('../src/index.js');
const client = new Client();

client.fetchMods({ player: 'StremZ', map: 'name' }).then(d => {
    console.log(d);
    client.getMod({
        name: d[Math.floor(Math.random() * d.length)] }
    ).then(console.log);
});