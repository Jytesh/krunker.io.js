
class kij  {
   constructor() {
  this.data = {
    current_version: "0.0.1",
    url: "https://sp5gv.sse.codesandbox.io/",
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
  async fetchClan(r) {
    try {
      let a = await fetch(`${this.data.url}clan/?name=${r}`);
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
  async fetchItemsByName(r) {
    try {
      let a = await fetch(`${this.data.url}items/obj/?name=${r}`);
 
    const t = await a.json();
return t
 
     } catch (r) {
      return console.error(this.data.err), this.data.err;
    }
   }
   async fetchItemsPrev(r){ 
      try {
      let a = await fetch(`${this.data.url}items/prev/?name=${r}`);
      return await a.json();
     } catch (r) {
      return console.error(this.data.err), this.data.err;
    }
    
       }
};
new kij().version().then(r => {
  r.version == new kij().data.current_version
    ? console.log("kij is up to date  BETA")
    : console.warn("kij is OUT of date. Check the repo for the latest version");
});
