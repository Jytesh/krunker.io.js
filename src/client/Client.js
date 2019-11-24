const ws = require("ws");

module.exports = class {
    constructor () {
        this.ws = new ws("wss://krunker_social.krunker.io/ws", {
            handshakeTimeout: 10000
        });
    }
    disconnect () {
        if (this.ws.readyState === 1) this.ws.close();
    }
}
