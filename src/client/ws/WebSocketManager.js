const WS = require('ws');
const { encode, decode } = require('msgpack-lite');

class WebSocketManager {
    constructor(client) {
        this.client = client;
        this._pings = [];
    }
    get ping() {
        return this._pings.reduce((a, b) => a + b, 0) / this._pings.length;
    }
    request(toSend, bufferData, callback, mult = false) {
        const ws = new WS('wss://social.krunker.io/ws', { handshakeTimeout: 10000 });
        const start = Date.now();
        return new Promise((res, rej) => {
            ws.onopen = () =>
                ws.send(
                    encode(toSend).buffer,
                );
            ws.onerror = err => {
                ws.terminate();
                rej(err);
            };

            ws.onmessage = buffer =>{
                const data = bufferData(decode(new Uint8Array(buffer.data)));
                this._pings.push(Date.now() - start);
                const r = callback(data);
                if (!mult) {
                    ws.close();
                    return res(r);
                }
                if (r) {
                    ws.close();
                    res(r);
                }
            };
        });
    }
}

module.exports = WebSocketManager;