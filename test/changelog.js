const krunker = require("../src/index.js");
const client = new krunker.Client();

client.fetchChangelog().then(c => {
    console.log(c);
    console.log(client.getChangelog());
});
