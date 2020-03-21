const { Client } = require("../src/index.js");
const client = new Client();

client.fetchPlayer("1s3k3b").then(console.log);
client.fetchPlayer("Sidney", { raw: true }).then(console.log);