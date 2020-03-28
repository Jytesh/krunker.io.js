module.exports = class Changelog {
    constructor(text) {
        this.raw = text;

        let arr = [];
        text.split('\n').filter(x => x).forEach(x => {
            if (x.startsWith(' == ')) {
                return arr.push({
                    version: x.match(/\d{1,3}\.\d{1,3}\.\d{1,3}/) ? x.match(/\d{1,3}\.\d{1,3}\.\d{1,3}/)[0] : '',
                    changes: [],
                });
            }
            arr[arr.length - 1] && arr[arr.length - 1].changes.push(x);
        });
        arr = arr.filter(x => x.version);

        this.versions = arr;
        this.latestVersion = arr[0];
    }
};
