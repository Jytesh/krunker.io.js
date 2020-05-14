const { Client } = require('../src/index.js');
const client = new Client();

client.fetchLeaderboard().then(c => {
    console.log(c);
    console.log(client.getLeaderboard());
    client.fetchLeaderboard('clans').then(console.log);
});
