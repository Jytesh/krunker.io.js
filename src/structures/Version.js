module.exports = class Version {
    constructor(text) {
        this.version = text.split("\n")[0].replace(/[^0-9.]/g, "");
        this.changes = text.split("\n").slice(1).map(x => x.substring(2));
    }
};
