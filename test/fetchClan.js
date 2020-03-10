const { Client } = require("../src/index.js");
const client = new Client();

client.fetchClan("T").then(console.log);
