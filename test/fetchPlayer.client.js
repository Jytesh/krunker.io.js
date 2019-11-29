const Krunker = require("../src/client/Client.js");
const client = new Krunker.Client();

(async () => console.log(await client.fetchPlayer("1s3k3b")))(); // fetch methods return a Promise as it takes time for the socket to load data, you need to wait for it to resolve in order to work

/*
output in console:

Player {
    username: "1s3k3b",
    level: 20,
    levelProgress: 44060,
    score: 488505,
    displayName: "1s3k3b [Vixe]",
    id: "no",
    lastPlayedClass: Class {
        name: "Run N Gun",
        health: 100,
        secondary: false,
        weapon: Weapon {
            name: "Submachine Gun",
            class: Class {
                ...Run N Gun
            },
            swapTime: 300,
            aimSpeed: 120,
            speedMultiplier: 1.04,
            ammo: 24,
            reloadTime: 1000,
            damage: {
                damage: 18,
                dropoff: 12,
                toNumber: fn 18
                toString: fn "18"
            },
            range: 700,
            rateOfFire: 70,
            spread: 70,
            zoom: 1.65,
            recoil: 0.0034,
            automatic: true,
            baseScore: 50,
            sight: "Red Dot",
            toString: fn "Submachine Gun"
        },
        toString: fn "Run N Gun"
    },
    stats: {
        timePlayed: {
            mins: 69,
            hours: 69,
            days: 69,
            toString: fn "69h 69m"
        }
    }
}
*/
