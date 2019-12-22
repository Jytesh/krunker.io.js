const Version = require("./Version.js");

module.exports = class Changelog {
    constructor(text) {
        text = text.match(/==(.*)==\n([\s\S])+/g)[0];
        this.versions = text.split("\n\n").map(v => new Version(v));
        this.latestVersion = versions[0].version;
    }
}
