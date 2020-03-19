const { Weapon, Client } = require("../src/index.js");
const client = new Client();
const arr = new Weapon("Sniper").skins.filter(s => s.rarityI >= 3);

console.log(arr);
console.log(client.getSkin(arr[Math.floor(Math.random() * arr.length)].name));
