const { Client } = require('../src/index.js');
const client = new Client();

client.fetchMaps({ player: 'Trivm2002', map: 'name' }).then(d => {
    console.log(d);
    client.getMap({
        name: d[Math.floor(Math.random() * d.length)] }
    ).then(console.log);
});