const Weapons = require("../data/Weapon.json")
const Collection = require('./Collection.js')
class Weapon  {
    constructor(id){
        if(typeof id === "string"){
            if(isInt(id)) id = parseInt(Number(id))
            else {
                id = require("../util/index").GetWeaponID(id)
                if(!id) return void 0;
            }
        }
        if(typeof id === "number" || typeof id === "bigint"){
        Weapons_Collection = new Collection()
        Weapons.map(W => Weapons_Collection.set(W.id,W))
        let Weapon = Weapons_Collection.get(id)
        if(Weapon.name){
            Weapon.Class = new Class(Weapon.Class)
        }


    }     

    else{
        console.log("ERROR")
        return void 0
    }
    }
}

module.exports = Weapon