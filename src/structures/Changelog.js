const Version = require("./Version.js");

module.exports = class Changelog {
    constructor(text) {
        this.versions = text.split("\n\n").map(v => new Version(v));
        this.latestVersion = this.versions[0].version;
    }
}
