const Krunker = require("../src/index.js");
const client = new Krunker.Client();

client.fetchPlayer("1s3k3b").then(console.log);