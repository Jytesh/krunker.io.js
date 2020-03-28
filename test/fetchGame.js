const Krunker = require("../src/index.js");
const client = new Krunker.Client();

client.fetchGame("https://krunker.io/?game=FRA:u7wpt").then(console.log); // outdated ID
