const { Client } = require('../src/index.js');
const client = new Client();

client.fetchInfected().then(d => {
	console.log(d);
	console.log(client.getInfected());
	client.fetchInfected(30).then(d3 => {
		console.log(d3);
		console.log(client.getInfected(30));
	});
});