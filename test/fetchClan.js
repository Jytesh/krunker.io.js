const Krunker = require("../src/index.js");
const client = new Krunker.Client();

client.fetchClan("Vixe").then(console.log);
