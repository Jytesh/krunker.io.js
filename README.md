<div align="center">
    <br/>
    <p>
        <a href="https://nodei.co/npm/krunker.js/"><img src="https://nodei.co/npm/krunker.js.png?downloads=true&stars=true"></a>
    </p>
</div>

# Installation
npm: `npm i krunker.js`
yarn: soon

# Usage
```js
const { Client } = require("krunker.js");
const client = new Client();

// getting info about a player
(async () => console.log(await client.fetchPlayer("1s3k3b")))();

// calculating chances for getting a contraband from heroic spins with 20k KR
console.log(util.spinChance("heroic", "contraband", 20000), "\n");
```
