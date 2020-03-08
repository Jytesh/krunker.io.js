const Weapon = require("./Weapon")

class Class{
    constructor(arg){
        let id = arg
    if(typeof id === "string"){
        if(isInt(id)) id = parseInt(Number(id))
        else {
            id = require("../util/index").GetClassID(id)
            if(!id) return void 0;
        }
    }
    
    if(typeof id === "number" || typeof id === "bigint"){
        let Classes = require("../data/Classes")
        const Collection = require("./Collection.js")
        let Class_Collection = new Collection()
        Classes.map(x=> Class_Collection.set(x.id,x))
        let Class = Class_Collection.get(id)
        
        if(Class.name){
            Class.weapon = new Weapon(Class.weapon.id)
            return Class
        }

        }

    else{
        console.log("ERROR")
        return void 0
    }
    }
}
function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }
module.exports = Class