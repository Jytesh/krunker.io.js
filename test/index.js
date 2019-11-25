const Krunker = require("krunker.js");
const client = new Krunker.Client();

(async () => console.log(await client.fetchPlayer("1s3k3b"))); // fetch methods return a Promise as it takes time for the socket to load data, you need to wait for it to resolve in order to work

/*
    
*/
