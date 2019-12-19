<div align="center"><a href="https://nodei.co/npm/krunker.io.js/"><img src="https://nodei.co/npm/krunker.io.js.png?downloads=true&stars=true"></a><p><a href="https://1s3k3b.github.io/krunkerjs/docs/index.html">Documentation (WIP)</a></p></div>

# Installation
npm: `npm i krunker.io.js`

# Usage
```js
const krunker = require("krunker.io.js");
const client = new krunker.Client();

// getting info about a player
client.fetchPlayer("1s3k3b").then(console.log);

// calculating chances for getting a contraband from heroic spins with 20k KR
console.log(krunker.util.spinChance("heroic", "contraband", 20000));
```
