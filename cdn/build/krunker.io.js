class kij {
	constructor() {
		this.data = {
			current_version: '0.0.2',
			url: 'https://krunker-api.glitch.me/',
			repo: 'https://github.com/1s3k3b/krunker.io.js',
			err: { error: 'Enable to get data' },
		};
	}
	async version() {
		try {
			const a = await fetch(`${this.data.url}version`);
			return await a.json();
		}
		catch (_) {
			return console.error(this.data.err);
		}
	}
	async fetchPlayer(r) {
		try {
			const a = await fetch(`${this.data.url}user/?name=${r}`);
			return await a.json();
		}
		catch (_) {
			return console.error(this.data.err);
		}
	}
	async fetchLeaderboard(r) {
		try {
			const a = await fetch(`${this.data.url}leaderboard/?orderBy=${r}`);
			return await a.json();
		}
		catch (_) {
			return console.error(this.data.err);
		}
	}
	async fetchItems(r) {
		try {
			const a = await fetch(`${this.data.url}items`);
			return await a.json();
		}
		catch (r) {
			return console.error(this.data.err), this.data.err;
		}
	}
	async fetchClan(r) {
		try {
			const a = await fetch(`${this.data.url}clan?name=${r}`);
			return await a.json();
		}
		catch (_) {
			return console.error(this.data.err);
		}
	}
	async class(r) {
		try {
			const a = await fetch(`${this.data.url}class?name=${r}`);
			return await a.json();
		}
		catch (_) {
			return console.error(this.data.err);
		}
	}
	async weapon(r) {
		try {
			const a = await fetch(`${this.data.url}weapons/?name=${r}`);
			return await a.json();
		}
		catch (_) {
			return console.error(this.data.err);
		}
	}
	async fetchItemsByName(r) {
		try {
			const a = await fetch(`${this.data.url}items/obj/?name=${r}`);
			return await a.json();
		}
		catch (_) {
			return console.error(this.data.err);
		}
	}
	async fetchItemsPrev(r) {
		try {
			const a = await fetch(`${this.data.url}items/prev/?name=${r}`);
			return await a.json();
		}
		catch (_) {
			return console.error(this.data.err);
		}
	}
}

new kij().version().then(r => {
	if (r.version !== new kij().data.current_version) console.warn('kij is out of date. Check the repo for the latest version');
});
