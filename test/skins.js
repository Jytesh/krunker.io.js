const { Weapon, Client } = require('../src/index.js');
const client = new Client();
const arr = new Weapon('Sniper').skins.filter(s => s.rarityI >= 3);

console.log(arr);
console.log(client.getSkin(arr[Math.floor(Math.random() * arr.length)].name));
console.log(client.getSkins({ filter: (s => s.rarityI >= 39) }));
console.log(client.getSkins({ count: 10, sort: (
    (a, b) =>
        a.weapon ? a.weapon.damage : 0
    - b.weapon ? b.weapon.damage : 0
),
}));
console.log(client.getSkins({ map: 'name' }));
console.log(client.getSkins({ map: s => s.name }));
