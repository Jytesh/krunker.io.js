const krunker = require('../src/index.js');
const client = new krunker.Client();

// getting all skins by a skinmaker 
console.log(client.getSkinsByCreator('Jytesh'))
