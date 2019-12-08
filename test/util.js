const { util } = require("../src/index.js");

console.log("Get the average damage of all the weapons");
console.log(util.averageStat("weapon", "damage"));
// 44.58

console.log("Get our chances for getting a contraband from heroic spins with 20k KR");
console.log(util.spinChance("heroic", "contraband", 20000));
