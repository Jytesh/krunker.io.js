const Krunker = require("krunker.js");
const client = new Krunker.Client();

(async () => console.log(await client.fetchPlayer("1s3k3b")))(); // fetch methods return a Promise as it takes time for the socket to load data, you need to wait for it to resolve in order to work

/*
Player {
    username: "1s3k3b",
    level: 20,
    levelProgress: 44060,
    score: 488505,
    displayName: "1s3k3b [Vixe]",
    id: "no",
    lastPlayedClass: Class {
        name: "Hunter",
        health: 60,
        mainWpn: Weapon {
            name: "Sniper",
            damage: "no idea",
            ammo: 3,
            reloadTime: "no idea"
        }   
    },
    stats: {
        timePlayed: {
            mins: 69,
            hours: 69,
            days: 69,
            toString: fn => "69h 69m"
        }
    }
}
*/
