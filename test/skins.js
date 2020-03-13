const { Weapon } = require("../src/index.js");

console.log(new Weapon("Sniper").skins.filter(s => s.rarityI >= 3));
