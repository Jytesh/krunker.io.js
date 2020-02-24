
var kij = {
  data: {
    current_version: "0.0.1",
    url: "https://9t46t.sse.codesandbox.io/",
    repo: "https://github.com/1s3k3b/krunker.io.js",
    err: { error: "Enable to get data" }
  },
  version: async r => {
    try {
      let a = await fetch(`${kij.data.url}version`);
      return await a.json();
    } catch (r) {
      return console.error("Enable to get data"), kij.data.err;
    }
  },
  fetchPlayer: async r => {
    try {
      let a = await fetch(`${kij.data.url}user/?name=${r}`);
      return await a.json();
    } catch (r) {
      return console.error("Enable to get data"), kij.data.err;
    }
  },
  fetchLeaderboard: async r => {
    try {
      let a = await fetch(`${kij.data.url}leaderboard/?orderBy=${r}`);
      return await a.json();
    } catch (r) {
      return console.error(kij.data.err), kij.data.err;
    }
  },
  fetchItems: async r => {
    try {
      let a = await fetch(`${kij.data.url}items`);
      return await a.json();
    } catch (r) {
      return console.error(kij.data.err), kij.data.err;
    }
  },
  class: async r => {
    try {
      let a = await fetch(`${kij.data.url}class/?name=${r}`);
      return await a.json();
    } catch (r) {
      return console.error(kij.data.err), kij.data.err;
    }
  },
  weapon: async r => {
    try {
      let a = await fetch(`${kij.data.url}weapons/?name=${r}`);
      return await a.json();
    } catch (r) {
      return console.error(kij.data.err), kij.data.err;
    }
  }
};
kij.version().then(r => {
  r.version == kij.data.current_version
    ? console.log("kij is up to date")
    : console.warn("kij is OUT of date. Check the repo for the latest version");
});

//kij.fetchLeaderboard("funds").then(d => console.log(d))
//kij.fetchPlayer("hoodgail").then(d => console.log(d))
//kij.weapon("Sniper Rifle").then(d => console.log(d))
//kij.class("hunter").then(d => console.log(d))
//kij.fetchItems().then(d => console.log(d))
//kij.version().then(d => console.log(d))
