const Krunker = require("../src/index.js");
const client = new Krunker.PlayerClient("1s3k3b");

client.on("kill", console.log);
client.on("die", console.log);
