<div align="center"><a href="https://nodei.co/npm/krunker.io.js/"><img src="https://nodei.co/npm/krunker.io.js.png?downloads=true&stars=true"></a></div>

# Installation
npm: `npm i krunker.io.js`

# Usage
```js
const krunker = require("krunker.io.js");
const client = new krunker.Client();

// getting info about a player
(async () => console.log(await client.fetchPlayer("1s3k3b")))();

// calculating chances for getting a contraband from heroic spins with 20k KR
console.log(krunker.util.spinChance("heroic", "contraband", 20000), "\n");
```
