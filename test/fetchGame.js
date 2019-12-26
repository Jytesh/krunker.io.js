const Krunker = require("../src/index.js");
const client = new Krunker.Client();

client.fetchGame("FRA:0ntcb").then(console.log); // outdated ID
