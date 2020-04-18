module.exports = {
    Client: require('./client/Client.js'),
    Game: require('./structures/Game.js'),
    Changelog: require('./structures/Changelog.js'),
    Skin: require('./structures/Skin.js'),
    Mod: require('./structures/Mod.js'),
    util: require('./util/index.js'),
    ...require('./structures/ClassWeapon.js'),
    ...require('./util/index.js'),
};
