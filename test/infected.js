const { Client } = require('../src/index.js');
const client = new Client();

client.fetchInfected().then(d => {
	console.log(d);
	console.log(client.getInfected());
});