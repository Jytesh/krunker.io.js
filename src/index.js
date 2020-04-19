module.exports = {
    Client: require('./client/Client.js'),
    WebSocketManager: require('./client/ws/WebSocketManager.js'),
    util: require('./util/index.js'),
    ...Object.fromEntries(
        require('fs')
            .readdirSync('src/structures/')
            .filter(f => f !== 'ClassWeapon.js')
            .map(f => [ f.split('.')[0], require('./structures/' + f) ]),
    ),
    ...require('./structures/ClassWeapon.js'),
    ...require('./util/index.js'),
};