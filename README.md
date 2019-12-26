<div align="center"><p><a href="https://nodei.co/npm/krunker.js/"><img src="https://nodei.co/npm/krunker.js.png?downloads=true&stars=true"></a></p><p><a href="https://www.npmjs.com/package/krunker.io.js"><img src="https://img.shields.io/npm/v/krunker.io.js.svg?maxAge=3600" alt="Version"></a><a href="https://www.npmjs.com/package/krunker.io.js"><img src="https://img.shields.io/npm/dt/krunker.io.js.svg?maxAge=3600" alt="Downloads"></a></p><p><a href="https://1s3k3b.github.io/krunkerjs/docs/index.html">Documentation (WIP)</a></p></div>

# Installation
npm: `npm i krunker.io.js`

# About
krunker.io.js is an API wrapper for [krunker.io](https://krunker.io/) which allows you to fetch player and game data, and get stats about weapons and classes.
- Supports TypeScript
- Object-oriented
- Has weapon and class stats

# Usage
```js
const krunker = require("krunker.io.js");
const client = new krunker.Client();

// getting info about a player
client.fetchPlayer("1s3k3b").then(console.log);

// calculating chances for getting a contraband from heroic spins with 20k KR
console.log(krunker.util.spinChance("heroic", "contraband", 20000));
```
