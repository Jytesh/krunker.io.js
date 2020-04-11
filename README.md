<div align="center"><p><a href="https://nodei.co/npm/krunker.io.js/"><img src="https://nodei.co/npm/krunker.io.js.png?downloads=true&stars=true"></a></p><p><a href="https://www.npmjs.com/package/krunker.io.js"><img src="https://img.shields.io/npm/v/krunker.io.js.svg?maxAge=3600" alt="Version"></a><a href="https://www.npmjs.com/package/krunker.io.js"><img src="https://img.shields.io/npm/dt/krunker.io.js.svg?maxAge=3600" alt="Downloads"></a></p><p><a href="https://1s3k3b.github.io/krunkerjs/docs/index.html">Documentation (WIP)</a></p></div>

# Installation
npm: `npm i krunker.io.js`

# About
krunker.io.js is an API wrapper for [krunker.io](https://krunker.io/) which allows you to fetch player and game data, and get stats about weapons and classes.
- Supports TypeScript (typings) 
- Object-oriented
- Has weapon, class, skin data

# Usage
```js
const krunker = require('krunker.io.js');
const client = new krunker.Client();

// getting player info
client
    .fetchPlayer('1s3k3b')
    .then(console.log);

// calculating chances for getting a contraband from heroic spins with 20k KR
console.log(`There is a ${krunker.util.spinChance('heroic', 'contraband', 20000)}% chance for getting a Contraband from 40 Heroic Spins`);

// getting the top 1 player on the level leaderboard
client
    .fetchLeaderboard('level')
    .then(leaderboard => console.log(`The highest level player is ${leaderboard[0]}`));

// getting skin info
console.log(client.getSkin('Flame Viper'));

// getting mod info
client
    .getMod({ name: 'EternityAU' })
    .then(console.log);

client
    .fetchChangelog()
    .then(changelog => console.log(changelog.latestVersion));
```
[More examples](https://github.com/1s3k3b/krunker.io.js/tree/master/test)
