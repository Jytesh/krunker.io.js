
class Weapon  {
    constructor(id,InputClass){
        const Class = require("./Class")
        const Weapons = require("../data/Weapons.json")
        const Collection = require('./Collection.js')
        if(typeof id === "string"){
            if(isInt(id)) id = parseInt(Number(id))
            else {
                id = require("../util/index").GetWeaponID(id)
                if(!id) return void 0;
            }
        }
        if(typeof id === "number" || typeof id === "bigint"){
        let Weapons_Collection = new Collection()
        Weapons.map(W => Weapons_Collection.set(W.id,W))
        let Weapon = Weapons_Collection.get(id)
        console.log(Weapon.class.id)
        if(Weapon.name){
            if(InputClass){
                Weapon.class = InputClass
            }else{
            Weapon.class = new Class(Weapon.class.id,Weapon)}
            return Weapon
        }else return void 0


    }     

    else{
        console.log("ERROR")
        return void 0
    }
    }
    toString(){
        return this.name
    }
}
function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }
module.exports = Weapon
