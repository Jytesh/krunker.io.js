const Version = require("./Version.js");

module.exports = class Changelog {
    constructor(text) {
        this.versions = text.split("\n\n").filter(x => x.split("\n")[0].split("").some(y => !isNaN(Number(y)))).map(v => new Version(v));
        this.latestUpdate = this.versions[0];
        this.currentVersion = this.versions[0].version;
    }
}
