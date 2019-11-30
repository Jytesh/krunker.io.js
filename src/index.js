module.exports = {
    Client: require("./client/Client.js"),
    PlayerClient: require("./client/PlayerClient.js"),
    Class: require("./structures/Class.js"),
    Weapon: require("./structures/Weapon.js"),
    regExp: {
        gameID: /[A-Z]{2,}:[abcdefghijklmnopqrstuvwxyz0123456789]+/g
    }
};
