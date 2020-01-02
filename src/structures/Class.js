// from my BetterJS
Object.prototype.forEach = function (callback) {
    Object.keys(this).forEach((key, index) => {
        callback(key, this[key], index, this);
    });
}

module.exports = class Class {
    constructor (name = "Triggerman") {
        const triggerman = {
            health: 100,
            name: "Triggerman",
            secondary: true,
            weapon: new Weapon("Assault Rifle"),
            toString(){
                return "Triggerman";
            },
            _avatar: "https://vignette.wikia.nocookie.net/krunkerio/images/1/15/Trigger.PNG/revision/latest/scale-to-width-down/310?cb=20191021162058"
        };
        
        const hunter = {
            health: 60,
            name: "Hunter",
            secondary: true,
            weapon: new Weapon("Sniper Rifle"),
            toString(){
                return "Hunter";
            },
            _avatar: "https://vignette.wikia.nocookie.net/krunkerio/images/1/1f/Hunter.PNG/revision/latest/scale-to-width-down/310?cb=20191021161821"
        };
        
        const runngun = {
            health: 100,
            name: "Run N Gun",
            secondary: false,
            weapon: new Weapon("Submachine Gun"),
            toString(){
                return "Run N Gun";
            },
            _avatar: "https://vignette.wikia.nocookie.net/krunkerio/images/c/c8/Run_n_gun.PNG/revision/latest/scale-to-width-down/310?cb=20191021161851"
        };
        
        const spraynpray = {
            health: 170,
            name: "Spray N Pray",
            secondary: true,
            weapon: new Weapon("Light Machine Gun"),
            toString(){
                return "Spray N Pray";
            },
            _avatar: "https://vignette.wikia.nocookie.net/krunkerio/images/c/c7/Capture.PNG/revision/latest/scale-to-width-down/310?cb=20191021162149"
        };
        
        const vince = {
            health: 100,
            name: "Vince",
            secondary: true,
            weapon: new Weapon("Shotgun"),
            toString(){
                return "Vince";
            },
            _avatar: "https://vignette.wikia.nocookie.net/krunkerio/images/d/d3/Vinc.PNG/revision/latest/scale-to-width-down/310?cb=20191021162119"
        };
        
        const detective = {
            health: 100,
            name: "Detective",
            secondary: false,
            weapon: new Weapon("Revolver"),
            toString(){
                return "Detective";
            },
            _avatar: "https://vignette.wikia.nocookie.net/krunkerio/images/a/a6/Screenshot_2018-10-13_at_7.14.06_PM.png/revision/latest/scale-to-width-down/310?cb=20191021161955"
        };
        
        const marksman = {
            health: 90,
            name: "Marksman",
            secondary: true,
            weapon: new Weapon("Semi Auto"),
            toString(){
                return "Marksman";
            },
            _avatar: "https://vignette.wikia.nocookie.net/krunkerio/images/0/08/MARKS.PNG/revision/latest/scale-to-width-down/310?cb=20191021162026"
        };
        
        const rocketeer = {
            health: 130,
            name: "Rocketeer",
            secondary: true,
            weapon: new Weapon("Rocket Launcher"),
            toString(){
                return "Rocketeer";
            },
            _avatar: "https://vignette.wikia.nocookie.net/krunkerio/images/b/b1/RLAUNCH.PNG/revision/latest/scale-to-width-down/310?cb=20191021162212"
        };
    
        const agent = {
            health: 100,
            name: "Agent",
            secondary: false,
            weapon: new Weapon("Akimbo Uzi"),
            toString(){
                return "Agent";
            },
            _avatar: "https://vignette.wikia.nocookie.net/krunkerio/images/8/84/Agent-select-screen.png/revision/latest/scale-to-width-down/310?cb=20191021161719"
        };
        
        const runner = {
            health: 100,
            name: "Runner",
            secondary: false,
            weapon: new Weapon("Combat Knife"),
            toString(){
                return "Runner";
            },
            _avatar: ""
        };
        
        const bowman = {
            health: 100,
            name: "Bowman",
            secondary: true,
            weapon: new Weapon("Crossbow"),
            toString(){
                return "Bowman";
            },
            _avatar: "https://vignette.wikia.nocookie.net/krunkerio/images/3/30/Bowman.png/revision/latest/scale-to-width-down/310?cb=20191021161923"
        };
        
        const commando = {
            health: 100,
            name: "Commando",
            secondary: true,
            weapon: new Weapon("Famas"),
            toString(){
                return "Commando";
            },
            _avatar: "https://vignette.wikia.nocookie.net/krunkerio/images/5/50/Commando.png/revision/latest/scale-to-width-down/310?cb=20191021160148"
        };
        
        const obj = {
            triggerman, hunter, runngun, spraynpray, vince, detective, marksman, rocketeer, agent, runner, bowman, commando
        }[name.split(" ").join("").toLowerCase()];
        
        if (!obj) return void 0;
        
        obj.forEach((k, v) => {
            this[k] = v;
        });
        
        return obj;
    }
}

class Weapon {
    constructor (name = "Assault Rifle") {
        const pistol = {
            name: "Pistol",
            swapTime: 350,
            aimSpeed: 120,
            speedMultiplier: 1.05,
            ammo: 10,
            reloadTime: 700,
            damage: {
                damage: 20,
                dropoff: 10,
                valueOf(){
                    return 20;
                },
                toString(){
                    return "20";
                }
            },
            range: 700,
            rateOfFire: 150,
            spread: 90,
            zoom: 1.4,
            recoil: 0.006,
            automatic: false,
            baseScore: 75,
            sight: null,
            devNumber: 3,
            toString () {
                return "Pistol";
            }
        };
        
        const deserteagle = {
            name: "Desert Eagle",
            swapTime: 200,
            aimSpeed: 120,
            speedMultiplier: 1,
            ammo: 6,
            reloadTime: 1000,
            damage: {
                damage: 50,
                dropoff: 10,
                valueOf(){
                    return 50;
                },
                toString(){
                    return "50";
                }
            },
            range: 700,
            rateOfFire: 400,
            spread: 150,
            zoom: 1.4,
            recoil: 0.01,
            automatic: false,
            baseScore: 50,
            sight: null,
            devNumber: 11,
            toString () {
                return "Desert Eagle";
            }
        };
        
        const alienblaster = {
            name: "Alien Blaster",
            swapTime: 200,
            aimSpeed: 120,
            speedMultiplier: 1,
            ammo: 4,
            reloadTime: 1500,
            damage: {
                damage: 50,
                dropoff: 10,
                valueOf(){
                    return 50;
                },
                toString(){
                    return "50";
                }
            },
            range: 700,
            rateOfFire: 150,
            spread: 150,
            zoom: 1.4,
            recoil: 0.007,
            automatic: false,
            baseScore: 50,
            sight: null,
            devNumber: 12,
            toString () {
                return "Alien Blaster";
            }
        };
        
        const combatknife = {
            name: "Combat Knife",
            baseScore: 150,
            damage: {
                damage: 50,
                dropoff: 0,
                toString: () => "50",
                valueOf: () => 50
            },
            toString () {
                return "Combat Knife";
            }
        };
        
        const assaultrifle = {
            name: "Assault Rifle",
            swapTime: 300,
            aimSpeed: 130,
            speedMultiplier: 0.95,
            ammo: 30,
            reloadTime: 1200,
            damage: {
                dropoff: 5,
                damage: 23,
                valueOf(){
                    return 23;
                },
                toString(){
                    return "23";
                }
            },
            range: 700,
            rateOfFire: 110,
            spread: 100,
            zoom: 1.6,
            recoil: 0.003,
            automatic: true,
            baseScore: 50,
            sight: "Red Dot",
            devNumber: 2,
            getSkin(n = Math.floor(Math.random() * 100)) {
                return "http://assets.krunker.io/textures/weapons/skins/weapon_" + this.devNumber + "_" + n + ".png";
            },
            toString () {
                return "Assault Rifle";
            }
        };
    
        const sniperrifle = {
            name: "Sniper Rifle",
            swapTime: 300,
            aimSpeed: 120,
            speedMultiplier: 0.95,
            ammo: 3,
            reloadTime: 1500,
            damage: {
                dropoff: 30,
                damage: 100,
                valueOf() {
                    return 100;
                },
                toString () {
                    return "100";
                }
            },
            range: 1000,
            rateOfFire: 900,
            spread: 260,
            zoom: 2.7,
            recoil: 0.009,
            automatic: false,
            baseScore: 50,
            sight: "Scope",
            devNumber: 1,
            getSkin(n = Math.floor(Math.random() * 100)) {
                return "http://assets.krunker.io/textures/weapons/skins/weapon_" + this.devNumber + "_" + n + ".png";
            },
            toString () {
                return "Sniper Rifle";
            }
        };

        const submachinegun = {
            name: "Submachine Gun",
            swapTime: 300,
            aimSpeed: 120,
            speedMultiplier: 1.04,
            ammo: 24,
            reloadTime: 1000,
            damage: {
                damage: 18,
                dropoff: 12,
                valueOf(){
                    return 18;
                },
                toString(){
                    return "18";
                }
            },
            range: 700,
            rateOfFire: 70,
            spread: 70,
            zoom: 1.65,
            recoil: 0.0034,
            automatic: true,
            baseScore: 50,
            sight: "Red Dot",
            devNumber: 4,
            getSkin(n = Math.floor(Math.random() * 100)) {
                return "http://assets.krunker.io/textures/weapons/skins/weapon_" + this.devNumber + "_" + n + ".png";
            },
            toString () {
                return "Submachine Gun";
            }
        };

        const lightmachinegun = {
            name: "Light Machine Gun",
            swapTime: 700,
            aimSpeed: 200,
            speedMultiplier: 0.79,
            ammo: 60,
            reloadTime: 3500,
            damage: {
                damage: 20,
                dropoff: 10,
                valueOf(){
                    return 20;
                },
                toString(){
                    return "20";
                }
            },
            range: 700,
            rateOfFire: 120,
            spread: 300,
            zoom: 1.3,
            recoil: 0.0032,
            automatic: true,
            baseScore: 50,
            sight: "Red Dot",
            devNumber: 5,
            getSkin(n = Math.floor(Math.random() * 100)) {
                return "http://assets.krunker.io/textures/weapons/skins/weapon_" + this.devNumber + "_" + n + ".png";
            },
            toString () {
                return "Light Machine Gun";
            }
        };
        
        const shotgun = {
            name: "Shotgun",
            swapTime: 300,
            aimSpeed: 120,
            speedMultiplier: 1,
            ammo: 2,
            reloadTime: 1100,
            damage: {
                damage: 50,
                dropoff: 50,
                valueOf(){
                    return 50;
                },
                toString(){
                    return "50";
                }
            },
            range: 210,
            rateOfFire: 400,
            spread: 120,
            zoom: 1.25,
            recoil: 0.0016,
            automatic: false,
            baseScore: 50,
            sight: "none",
            devNumber: 6,
            getSkin(n = Math.floor(Math.random() * 100)) {
                return "http://assets.krunker.io/textures/weapons/skins/weapon_" + this.devNumber + "_" + n + ".png";
            },
            toString () {
                return "Shotgun";
            }  
        };
        
        const revolver = {
            name: "Revolver",
            swapTime: 200,
            aimSpeed: 120,
            speedMultiplier: 1.04,
            ammo: 6,
            reloadTime: 900,
            damage: {
                damage: 66,
                dropoff: 10,
                valueOf(){
                    return 66;
                },
                toString(){
                    return "66";
                }
            },
            range: 700,
            rateOfFire: 390,
            spread: 100,
            zoom: 1.25,
            recoil: 0.0013,
            automatic: false,
            baseScore: 50,
            sight: "none",
            devNumber: 7,
            getSkin(n = Math.floor(Math.random() * 100)) {
                return "http://assets.krunker.io/textures/weapons/skins/weapon_" + this.devNumber + "_" + n + ".png";
            },
            toString () {
                return "Revolver";
            }  
        };
        
        const semiauto = {
            name: "Semi Auto",
            swapTime: 300,
            aimSpeed: 120,
            speedMultiplier: 1,
            ammo: 8,
            reloadTime: 1500,
            damage: {
                damage: 34,
                dropoff: 0,
                valueOf(){
                    return 34;
                },
                toString(){
                    return "34";
                }
            },
            range: 1000,
            rateOfFire: 120,
            spread: 250,
            zoom: 2.1,
            recoil: 0.01,
            automatic: false,
            baseScore: 50,
            sight: "Red Dot",
            devNumber: 8,
            getSkin(n = Math.floor(Math.random() * 100)) {
                return "http://assets.krunker.io/textures/weapons/skins/weapon_" + this.devNumber + "_" + n + ".png";
            },
            toString () {
                return "Semi Auto";
            }  
        };
        
        const rocketlauncher = {
            name: "Rocket Launcher",
            swapTime: 600,
            aimSpeed: 200,
            speedMultiplier: 1.9,
            ammo: 2,
            reloadTime: 1600,
            damage: {
                damage: 127,
                dropoff: 60,
                valueOf(){
                    return 127;
                },
                toString(){
                    return "127";
                }
            },
            range: Infinity,
            rateOfFire: 1,
            spread: 120,
            zoom: 1.5,
            recoil: 0.008,
            automatic: false,
            baseScore: 50,
            sight: "none",
            devNumber: 9,
            getSkin(n = Math.floor(Math.random() * 100)) {
                return "http://assets.krunker.io/textures/weapons/skins/weapon_" + this.devNumber + "_" + n + ".png";
            },
            toString () {
                return "Rocket Launcher";
            }  
        };
        
        const akimbouzi = {
            name: "Akimbo Uzi",
            swapTime: 300,
            aimSpeed: 120,
            speedMultiplier: 1.04,
            ammo: 6,
            reloadTime: 900,
            damage: {
                damage: 18 * 2,
                dropoff: 12,
                valueOf(){
                    return 18 * 2;
                },
                toString(){
                    return "18 * 2";
                }
            },
            range: 300,
            rateOfFire: 400,
            spread: 40,
            zoom: null,
            recoil: 0.0034,
            automatic: true,
            baseScore: 50,
            sight: null,
            devNumber: 10,
            getSkin(n = Math.floor(Math.random() * 100)) {
                return "http://assets.krunker.io/textures/weapons/skins/weapon_" + this.devNumber + "_" + n + ".png";
            },
            toString () {
                return "Akimbo Uzi";
            }  
        };
        
        const crossbow = {
            name: "Crossbow",
            swapTime: 200,
            aimSpeed: 120,
            speedMultiplier: 1,
            ammo: 1,
            reloadTime: 1000,
            damage: {
                damage: 200,
                dropoff: 0,
                valueOf(){
                    return 200;
                },
                toString(){
                    return "200";
                }
            },
            range: 300,
            rateOfFire: 150,
            spread: 700,
            zoom: 1.4,
            recoil: 0.007,
            automatic: false,
            baseScore: 50,
            sight: "Red Dot",
            devNumber: 14,
            getSkin(n = Math.floor(Math.random() * 100)) {
                return "http://assets.krunker.io/textures/weapons/skins/weapon_" + this.devNumber + "_" + n + ".png";
            },
            toString () {
                return "Crossbow";
            }  
        };
        
        const famas = {
            name: "FAMAS",
            swapTime: 300,
            aimSpeed: 130,
            speedMultiplier: 0.95,
            ammo: 30,
            reloadTime: 1200,
            damage: {
                damage: 28,
                dropoff: 5,
                valueOf(){
                    return 28;
                },
                toString(){
                    return "28";
                }
            },
            range: 700,
            rateOfFire: 280,
            spread: 90,
            zoom: 1.5,
            recoil: 0.0032,
            automatic: false,
            baseScore: 50,
            sight: "none",
            devNumber: 13,
            getSkin(n = Math.floor(Math.random() * 100)) {
                return "http://assets.krunker.io/textures/weapons/skins/weapon_" + this.devNumber + "_" + n + ".png";
            },
            toString () {
                return "FAMAS";
            }  
        };
        
        const obj = {
            pistol, deserteagle, deagle: deserteagle, alienblaster, assaultrifle, ak: assaultrifle, sniperrifle, sniper: sniperrifle, submachinegun, smg: submachinegun, lightmachinegun, lmg: lightmachinegun, shotgun, revolver, semiauto, rocketlauncher, famas, burst: famas
        }[name.split(" ").join("").toLowerCase()];
        
        if (!obj) return void 0;

        obj.forEach((k, v) => Object.defineProperty(this, k, { value: v, writable: false }));

        return obj;
    }
}
