declare module "krunker.io.js" {
    export interface ISkin {
        name: string;
        id: number | string;
        tex: number;
        key: string;
        seas: number;
        rarity: number;
        weapon: number;
        creator?: string;
        glow?: boolean;
    }
    export class Skin {
        constructor(wResolvable: Class | Weapon | string, data: ISkin);
        public fetchAuthor(client: Client): Promise<Player>;
        author?: Player;
        weapon: Weapon;
        name: string;
        id: number | string;
        tex: number;
        key: string;
        season: number;
        rarityI: number;
        rarity: string;
        authorUsername: string;
        glow: boolean;
        url: string;
    }
    export interface Player {
        username: string;
        level: number;
        levelImage: string;
        levelProgress: number;
        score: number;
        displayName: string;
        id: string;
        lastPlayedClass?: Class;
        mods?: Mod[];
        joinedAt: Date;
        stats: {
            shots: number;
            hits: number;
            accuracy: number;
            nukes: number;
            kills: number;
            melees: number;
            deaths: number;
            kdr: number;
            gamesPlayed: number;
            wins: number;
            losses: number;
            wlr: number;
            kpg: number;
            timePlayed: {
                ms: number;
                mins: number;
                hours: number;
                days: number;
                toString(): string;
                valueOf(): number;
            }
        };
        social: {
            clan: Clan | string | null;
            followers: number;
            following: number;
        };
    }
    export class Changelog {
        constructor(text: string);
        versions: Array<{
            version: string;
            changes: string[];
        }>;
        latestVersion: {
            version: string;
            changes: string[];
        };
    }
    export class Weapon {
        constructor(name: string);
        name: string;
        toString(): string;
        class: Class;
        swapTime: number;
        aimSpeed?: number;
        speedMultiplier: number;
        ammo?: number;
        reloadTime?: number;
        damage: {
            damage: number;
            dropoff: number;
            toString(): string;
            valueOf(): number;
        };
        range: number;
        rateOfFire: number;
        spread?: number;
        zoom?: number;
        recoil?: number;
        automatic: boolean;
        baseScore: number;
        sight: string;
        devNumber?: number;
        getSkin?(n: number): string;
    }
    export class Class {
        constructor(name: string);
        health: number;
        name: string;
        secondary: boolean;
        weapon: Weapon;
        toString(): string;
    }
    export class Game {
        constructor(data: Array<any>);
        id: string;
        players: {
            players: number;
            max: number;
            toString(): string;
            valueOf(): number;
        };
        gameMode: string;
        map: string;
        custom: boolean;
    }
    export class Clan {
        id: number;
        name: string;
        score: number;
        leader: string;
        members: string[];
    }
    export class Client {
        constructor();
        public players: Map<string, Player>;
        public clans: Map<string, Clan>;
        private _connectWS(): void;
        private _disconnectWS(): void;
        private _updateCache(): void;
        public fetchPlayer(username: string, options: {
            cache: boolean,
            raw: boolean,
            clan: boolean,
            mods: boolean
        }): Promise<Player>;
        public fetchGame(id: string): Promise<Game>;
        public fetchChangelog(): Promise<Changelog>;
        public fetchClan(name: string, options: {
            cache: boolean,
            raw: boolean
        }): Promise<Clan>;
        public getPlayer(nameOrID: string, options: {
            updateCache: boolean,
            raw: boolean,
            clan: boolean,
            mods: boolean
        }): Player|Promise<Player>;
        public getGame(nameOrID: string, options: {
            updateCache: boolean,
            raw: boolean
        }): Clan|Promise<Clan>;
        public getWeapon(name?: string): Weapon;
        public getClass(name?: string): Class;
    }
    export class Mod {
        constructor(data: Object);
        public fetchAuthor(client: Client): Promise<Player>;
        name: string;
        authorUsername: string;
        rank: number;
        id: number;
        votes: number;
        url: string;
        createdAt: Date;
        image: string;
    }
}
