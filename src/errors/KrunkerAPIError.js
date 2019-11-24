module.exports = class extends Error {
    constructor (msg) {
        super(msg);
        this.name = "KrunkerAPIError";
    }
}
