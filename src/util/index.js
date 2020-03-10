const round = (n, r) => {
    while (n % r !== 0) n--;
    return n;
};

const avg = (...nums) => nums.reduce((acc, val) => acc + val) / nums.length;
const mostOccurs = arr => {
    const map = new Map();
    const obj = {};
    
    let mostOccurElem = {
        val: undefined,
        occur: 0,
        arrIndex: 0
    };

    arr.forEach((o, i) => {
        map.set(o, map.get(o) ? map.get(o) + 1 : 1);
        obj[o] = map.get(o);
        if (map.get(o) > mostOccurElem.occur) {
            mostOccurElem = {
                val: o,
                occur: map.get(o),
                arrIndex: i
            };
        }
    });
    
    return {
        count: Math.max(...Object.values(obj)),
        element: this[mostOccurElem.arrIndex]
    };
};
function GetRegion(regionStr)
    {   regionStr = regionStr.toLowerCase()
        let region
        switch (regionStr) {
            case "sv" || "ny" || "mia" || "na":
                region = "NA"
                break;
            case "fra" || "eu":
                region = "EU"
                break;
            case "syd" || "oce":
                region = "OCE"
                break;
            case "sin" || "tok" || "as":
                region = "AS"
                break
            default:
                region = "regionStr";
                break;
        }
        return region;
    }
function GetClass(classId)
    {
        let c;
        switch (classId) {
            case 0:
                c = "Triggerman";
                break;
            case 1:
                c = "Hunter";
                break;
            case 2:
                c = "Run N Gun";
                break;
            case 3:
                c = "Spray N Pray";
                break;
            case 4:
                c = "Vince";
                break;
            case 5:
                c = "Detective";
                break;
            case 6:
                c = "Marksman";
                break;
            case 7:
                c = "Rocketeer";
                break;
            case 8:
                c = "Agent";
                break;
            case 9:
                c = "Runner";
                break;
            case 10:
                c = "Bowman";
                break;
            case 11:
                c = "Commando";
                break;
            default:
                c = false
        }

        return c;
    }
function  GetWeapon(id){ //Class's ID
    if(Number(id)){
        switch (id){
            case 1:
            return "Assault Rifle"
            case 2:
            return "Sniper"
            case 3:
            return "Pistol"
            case 4:
            return "Submachine Gun"
            case 5:
            return "Revolver"
            case 6:
            return "Shotgun"
            case 7:
            return "Machine Gun"
            case 8:
            return "Semi Auto"
            case 9:
            return "Rocket Launcher"
            case 10:
            return "Akimbo Uzi"
            case 11:
            return "Deagle"
            case 12:
            return "Tec9"
            case 13:
            return "Alien Blaster"
            case 14:
            return "Roit Shield"
            case 15:
            return "FAMAS"
            case 16:
            return "Flame Thrower"
            case 17:
            return "Crossbow"
        }
    }else{
        return false
    }

}
function GetWeaponID(arg){
    arg = arg.split(" ").join("").toLowerCase()
        switch (id){
            case "assaultrifle":
            return 1
            case "Sniper":
            return 2
            case "Pistol":
            return 3
            case "Submachine Gun":
            return 4
            case "Revolver":
            return 5
            case "Shotgun":
            return 6
            case "Machine Gun":
            return 7
            case "Semi Auto":
            return 8
            case "Rocket Launcher":
            return 9
            case "Akimbo Uzis":
            return 10
            case "Deagle":
            return 11
            case "Tec9":
            return 12
            case "Alien Blaster":
            return 13
            case "Riot Shield":
            return 14
            case "FAMAS":
            return 15
            case "Flame Thrower":
            return 16
            case "Crossbow":
            return 17
            default:
            return false;
        }
    }
function GetLevel(data)
    {
        const score = data
        return Math.max(1, Math.floor(0.03 * Math.sqrt(score)));
    }
function GetClassID(arg){
    arg = arg.split(" ").join("").toLowerCase()
    switch (arg){
        case "triggerman":
            return 0;
        case "hunter":
            return 1;
        case "runngun":
            return 2;
        case "spraynpray":
            return 3;
        case "vince":
            return 4;
        case "detective":
            return 5;
        case "marksman":
            return 6;
        case "rocketeer":
            return 7;
        case "agent":
            return 8;
        case "runner":
            return 9;
        case "bowman":
            return 10;
        case "commando":
            return 11;
        }
}
function GetLevelProgress(playerScore)
    {
        const PROG_VAR = 0.03;

        const t         = PROG_VAR * (Math.sqrt(playerScore));
        const level     = Math.floor(t);
        const levelProg = Math.round(100 * (t - level));

        return levelProg;
    }
module.exports = {
    round,
    avg,
    mostOccurs,
    GetRegion,
    GetClass,
    GetClassID,
    GetWeapon,
    GetWeaponID,
    GetLevel,
    GetLevelProgress
}
/*async function classwrite(){
    Classes = []
    for(let i = 0;i<12;i++){
        Class_name = GetClass(i)
        Class = require("../../deprecated/Class")
        Class = new Class(Class_name)
        Class.id = i
        Class.weapon = { "name" : Class.weapon.name,"id" : Class.weapon.devNumber || Class.weapon.id}
        delete Class["devNumber"]
        delete Class["getSkin"]
        delete Class["_avatar"]
        Class.avatar = `https://assets.krunker.io/textures/classes/icon_${Class.id}.png?build=xnPDG`
        Classes.push(Class)
        console.log(Class)
    }   
    await require("fs").writeFileSync("../data/Classes.json",JSON.stringify(Classes)) //Some maybe missing and some weapon IDs may be wrong.Check after you use
}
classwrite()
async function weaponwrite(){
    Weapons = []
    for(let i = 1;i<18;i++){
        Weapon_name = GetWeapon(i)
        Weapon = require("../../deprecated/Weapon")
        Weapon = new Weapon(Weapon_name)
        Weapon.id = i
        console.log(Weapon)
        if(Weapon.class){
            
        Weapon.class = { "name" : Weapon.class.name,"id" : Weapon.class.devNumber || Weapon.class.id}}
        else if(Weapon.name){
            Weapon.class = "Secondary"
        }else{
            Weapon = {
                id : Weapon.id,
                WIP : true
            }
        }
        delete Weapon["devNumber"]
        delete Weapon["getSkin"]
        delete Weapon["_avatar"]
        Weapons.push(Weapon)
        //Class.avatar = `https://assets.krunker.io/textures/classes/icon_${Class.id}.png?build=xnPDG`
        
        
    }   
    await require("fs").writeFileSync("../data/Weapons.json",JSON.stringify(Weapons)) //Some maybe missing and some weapon IDs may be wrong.Check after you use
}
weaponwrite()*/