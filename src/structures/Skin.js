const Weapon = require("./Weapon")
class Skin{
    constructor(key,options)
    {   options = {} || options
        key = key.toUpperCase()
        let Skins_collection = Skins()
        let skin = Skins_collection.get(key)
        if(!skin.creator) skin.creator = "Krunker.io"
        if(!skin.glow) skin.glow = false
        if(options.weapon)skin.weapon = new Weapon(skin.weapon)
        return skin

    }
}
function Skins(){
const Skins = require("../data/Skins.json")
    const Collection = require("./Collection")
    Skins_collection = new Collection
    Skins.forEach(element => {
    if(element.key){
        key = element.key.substring(0,1).toUpperCase() 
        if(element.weapon){
            key += "_" + element.weapon + "_" +element.id
        }
        else if(key == "H" || key == "B" || key=="K"){
            key += "_"+element.id+"_"+element.tex
        }else if(key == "S"){
            key += "_"+element.id
        }
        Skins_collection.set(key,element)
    }
    
});
return Skins_collection
}
module.exports = Skin