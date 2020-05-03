var skins = require("../data/skins.json");

exports.getSkinsByCreator = function (creator) {
    var itemNum = 0,
        arrayLength = skins.length,
        skinsByCreatorArray = [],
        creator1 = creator,
        creator2 = creator,
        lowcCreator = creator.toLowerCase(),
        skinCreator;

    if (lowcCreator == "krunker") {
        creator1 = "krunker.io"
    } else if (lowcCreator == "jon") {
        creator1 = "jonschmiddy"
    } else if (lowcCreator == "spy") {
        creator1 = "ispy"
    } else if (lowcCreator == "blitz") {
        creator1 = "blitz-.";
        creator2 = "blitz"
    } else if (lowcCreator == "blitz-.") {
        creator1 = "blitz-.";
        creator2 = "blitz"
    } else if (lowcCreator == "halloluke") {
        creator1 = "halloluke0201"
    } else if (lowcCreator == "irizu") {
        creator1 = "_irizu"
    } else if (lowcCreator == "vx_bomb") {
        creator1 = "vx bomb"
    } else if (lowcCreator == "electrode") {
        creator1 = "electrode";
        creator2 = "electrode_"
    } else if (lowcCreator == "electrode_") {
        creator1 = "electrode";
        creator2 = "electrode_"
    } else if (lowcCreator == "float") {
        creator1 = "floatingpoint"
    } else if (lowcCreator == "kltter") {
        creator1 = "kitter";
        creator2 = "kltter"
    } else if (lowcCreator == "kitter") {
        creator1 = "kitter";
        creator2 = "kltter"
    } else if (lowcCreator == "zino") {
        creator1 = "zino";
        creator2 = "zinoob"
    } else if (lowcCreator == "zinoob") {
        creator1 = "zino";
        creator2 = "zinoob"
    } else if (lowcCreator == "jhonxay") {
        creator1 = "jhonxay_playz";
        creator2 = "jhonxay"
    } else if (lowcCreator == "jhonxay_playz") {
        creator1 = "jhonxay";
        creator2 = "jhonxay_playz"
    } else if (lowcCreator == "omar") {
        creator1 = "0mar"
    } else if (lowcCreator == "porg") {
        creator1 = "edibleporg"
    } else if (lowcCreator == "nightlybuild") {
        creator1 = "nightly-build7"
    }

    while (itemNum < arrayLength) {
        skinCreator = skins[itemNum].creator;
        if (skinCreator == undefined) {
            skinCreator = "Krunker.io";
        };
        if (skinCreator.toLowerCase() == lowcCreator) {
            skinsByCreatorArray.push(skins[itemNum].name);
        } else if (skinCreator.toLowerCase() == creator1.toLowerCase()) {
            skinsByCreatorArray.push(skins[itemNum].name);
        } else if (skinCreator.toLowerCase() == creator2.toLowerCase()) {
            skinsByCreatorArray.push(skins[itemNum].name);
        };
        itemNum++;
    };
    return skinsByCreatorArray
};
