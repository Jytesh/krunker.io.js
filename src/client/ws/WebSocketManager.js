const WS = require('ws');
const { encode, decode } = require('msgpack-lite');

class WebSocketManager {
    constructor(client) {
        this.client = client;
        this._pings = [];
    }
    get pings() {
        return this._pings.reduce((a, b) => a + b, 0) / this._pings.length;
    }
    request(toSend, bufferData, callback, mult = false) {
        this.connect();
        const start = Date.now();
        return new Promise((res, rej) => {
            this.ws.onopen = () =>
                this.ws.send(
                    encode(toSend).buffer,
                );
            this.ws.onerror = err => {
                this.ws.terminate();
                rej(err);
            };

            this.ws.onmessage = buffer =>{
                const data = bufferData(decode(new Uint8Array(buffer.data)));
                this._pings.push(Date.now() - start);
                const r = callback(data);
                if (!mult) {
                    this.disconnect();
                    return res(r);
                }
                if (r) {
                    this.disconnect();
                    res(r);
                }
            };
        });
    }
    connect() {
        this.ws = new WS('wss://social.krunker.io/ws', { handshakeTimeout: 10000 });
    }
    disconnect() {
        if (this.ws) this.ws.close();
    }
}

module.exports = WebSocketManager;