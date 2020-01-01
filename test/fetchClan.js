const krunker = require("../src/index.js");
const client = new krunker.Client();

client.fetchClan("Vixe").then(console.log);
