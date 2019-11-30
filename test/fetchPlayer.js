const Krunker = require("../src/index.js");
const client = new Krunker.Client();

(async () => console.log(await client.fetchPlayer("1s3k3b")))(); // fetch methods return a Promise as it takes time for the socket to load data, you need to wait for it to resolve in order to work

/*
output in console:

{
  username: '1s3k3b',
  level: 21,
  levelProgress: 10,
  score: 494860,
  displayName: '1s3k3b [Vixe]',
  id: 6167027,
  lastPlayedClass: {
    health: 100,
    name: 'Triggerman',
    secondary: true,
    weapon: {
      name: 'Assault Rifle',
      class: 'Triggerman',
      swapTime: 300,
      aimSpeed: 130,
      speedMultiplier: 0.95,
      ammo: 30,
      reloadTime: 1200,
      damage: [Object],
      range: 700,
      rateOfFire: 110,
      spread: 100,
      zoom: 1.6,
      recoil: 0.003,
      automatic: true,
      baseScore: 50,
      sight: 'Red Dot',
      toString: [Function: toString]
    },
    toString: [Function: toString]
  },
  stats: {
    timePlayed: { mins: 20, hours: 19, days: 0, toString: [Function: toString] },
    shots: 54804,
    hits: 14595,
    accuracy: 3.75,
    nukes: 0,
    kills: 4365,
    deaths: 2545,
    kdr: '1.72',
    gamesPlayed: 314,
    wins: 170,
    losses: 144,
    wlr: '1.18',
    kpg: '0.07'
  },
  social: { clan: 'Vixe', following: 0, followers: 0 }
}
*/
