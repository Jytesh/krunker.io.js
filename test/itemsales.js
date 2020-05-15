const krunker = require('krunker.io.js');
const client = new krunker.Client();

//this gets items sales for a weapon, hat, body, etc. (keep in mind this can take several seconds to load)

client
    .getItemSales('Vantablack')
    .then(console.log);
