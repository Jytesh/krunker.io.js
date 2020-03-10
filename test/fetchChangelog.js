const krunker = require("../src/index.js");
const client = new krunker.Client();

client.fetchChangelog().then(console.log);
