const Version = require("./Version.js");

module.exports = class Changelog {
    constructor(text) {
        this.versions = text.split("\n\n").map(v => new Version(v));
        this.latestVersion = versions[0].version;
    }
}
