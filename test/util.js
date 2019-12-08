const { util } = require("../src/index.js");

console.log("The average damage of all weapons in the game:");
console.log(util.averageStat("weapon", "damage"), "\n");
// 44.58

console.log("Our chances for getting a contraband from heroic spins with 20k KR:");
console.log(util.spinChance("heroic", "contraband", 20000), "\n");
// 20.00

console.log("An array of all classes' names in the game:");
console.log(util.classes, "\n");
/*
[
  'Triggerman', 'Hunter',
  'Run N Gun',  'Spray N Pray',
  'Vince',      'Detective',
  'Marksman',   'Rocketeer',
  'Agent',      'Runner',
  'Bowman',     'Commando'
] 
*/

console.log("An array of all weapons' names in the game:");
console.log(util.weapons, "\n");
/*
[
  'Assault Rifle',
  'Sniper Rifle',
  'Submachine Gun',
  'Light Machine Gun',
  'Shotgun',
  'Revolver',
  'Semi Auto',
  'Rocket Launcher',
  'FAMAS'
] 
*/