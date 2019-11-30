const Krunker = require("../src/index.js");
const client = new Krunker.Client();

(async () => console.log(await client.fetchGame("FRA:hoata")))();
