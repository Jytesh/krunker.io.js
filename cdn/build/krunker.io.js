
class kij  {
   constructor() {
  this.data =  {
    current_version: "0.0.1",
    url: "https://9t46t.sse.codesandbox.io/",
    repo: "https://github.com/1s3k3b/krunker.io.js",
    err: { error: "Enable to get data" }
  }
   }
   async version(r)  {
    try {
      let a = await fetch(`${this.data.url}version`);
      return await a.json();
    } catch (r) {
      return console.error(this.data.err), kij.data.err;
    }
  }
  async fetchPlayer(r) {
    try {
      let a = await fetch(`${this.data.url}user/?name=${r}`);
      return await a.json();
    } catch (r) {
      return console.error(this.data.err), this.data.err;
    }
  }
  async fetchLeaderboard(r) {
    try {
      let a = await fetch(`${this.data.url}leaderboard/?orderBy=${r}`);
      return await a.json();
    } catch (r) {
      return console.error(this.data.err), this.data.err;
    }
  }
  async fetchItems(r) {
    try {
      let a = await fetch(`${this.data.url}items`);
      return await a.json();
    } catch (r) {
      return console.error(this.data.err), this.data.err;
    }
  }
  async class(r) {
    try {
      let a = await fetch(`${this.data.url}class/?name=${r}`);
      return await a.json();
    } catch (r) {
      return console.error(this.data.err), this.data.err;
    }
  }
  async weapon(r) {
    try {
      let a = await fetch(`${this.data.url}weapons/?name=${r}`);
      return await a.json();
    } catch (r) {
      return console.error(this.data.err), this.data.err;
    }
  }
};
new kij().version().then(r => {
  r.version == this.data.current_version
    ? console.log("kij is up to date on BETA")
    : console.warn("kij is OUT of date. Check the repo for the latest version");
});
var client = new kij()
//client.fetchLeaderboard("funds").then(d => console.log(d))
//client.fetchPlayer("hoodgail").then(d => console.log(d))
//client.weapon("Sniper Rifle").then(d => console.log(d))
//client.class("hunter").then(d => console.log(d))
//client.fetchItems().then(d => console.log(d))
//client.version().then(d => console.log(d))
