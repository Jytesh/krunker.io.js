const { Weapon } = require("../src/index.js");

console.log(new Weapon("Sniper Rifle"));

/*
{
  name: 'Sniper Rifle',
  class: 'Hunter',
  swapTime: 300,
  aimSpeed: 120,
  speedMultiplier: 0.95,
  ammo: 3,
  reloadTime: 1500,
  damage: {
    dropoff: 30,
    damage: 100,
    toNumber: [Function: toNumber],
    toString: [Function: toString]
  },
  range: 1000,
  rateOfFire: 900,
  spread: 260,
  zoom: 2.7,
  recoil: 0.009,
  automatic: false,
  baseScore: 50,
  sight: 'Scope',
  toString: [Function: toString]
}
*/
