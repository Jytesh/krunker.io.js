declare module 'krunker.io.js' {
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
        classes: object;
        mods: Mod[] | string[];
        joinedAt: Date;
        hacker: boolean;
        region: number;
        stats: {
            shots: number;
            hits: number;
            accuracy: number;
            nukes: number;
            kills: number;
            melees: number;
            headshots: number;
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
            };
            challengesLevel: number;
        };
        social: {
            clan: Clan | string | null;
            followers: number;
            following: number;
        };
    }
    export class Changelog {
        constructor(text: string);
        versions: {
            version: string;
            changes: string[];
        }[];
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
        constructor(name: string, data?: object);
        health: number;
        name: string;
        secondary: boolean;
        weapon: Weapon;
        devNumber: number;
        toString(): string;
        score?: number;
        level?: number;
    }
    export class Game {
        constructor(data: any[]);
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
        public fetchLeader(): Promise<Player>;
        id: number;
        name: string;
        score: number;
        leaderUsername: string;
        members: Array<{
            username: string;
            level: number;
            levelProgress: number;
            score: number;
            levelImage: string;
            toString(): string;
        }>;
        verified: boolean;
    }
    export class Client {
        constructor();
        private _pings: number[];
        public ping: number;
        public players: Map<string, Player>;
        public clans: Map<string, Clan>;
        public fetchPlayer(username: string, options: {
            cache: boolean,
            raw: boolean,
            clan: boolean,
            mods: boolean
        }): Promise<Player>;
        public fetchInfected(): Promise<{ date: Date, infected: number }[]>;
        public getInfected(): { date: Date, infected: number }[] | Promise<{ date: Date, infected: number }[]>;
        public fetchGame(id: string): Promise<Game>;
        public fetchChangelog(): Promise<Changelog>;
        public fetchClan(name: string, options: {
            cache: boolean,
            raw: boolean
        }): Promise<Clan>;
        public fetchLeaderboard(orderBy?: string): Promise<string[]>;
        public getPlayer(nameOrID: string, options: {
            updateCache: boolean,
            raw: boolean,
            clan: boolean,
            mods: boolean
        }): Player | Promise<Player>;
        public getGame(nameOrID: string, options: {
            updateCache: boolean,
            raw: boolean
        }): Clan | Promise<Clan>;
        public getChangelog(): Changelog | Promise<Changelog>;
        public getLeaderboard(orderBy?: string): string[] | Promise<string[]>;
        public getWeapon(name?: string): Weapon;
        public getClass(name?: string): Class;
        public getSkin(name: string): null | Skin;
        getSkins(options: {
            filter?: () => boolean;
            sort?: () => number;
            map?: (() => any) | string;
            count?: number;
        }): Skin[];
        fetchMods(options: {
            player?: string | Player | Clan;
            filter?: () => boolean;
            sort?: () => number;
            map?: (() => any) | string;
            count?: number;
        }): Promise<Mod[]>;
        getMod(options: {
            name?: string;
            id?: number;
            rank?: number;
        }): Promise<Mod>;
    }
    export class Mod {
        constructor(data: object);
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
    export const util: {
        classes: string[];
        weapons: string[];
        spins: object;
        resolver: {
            classNameArray(arr: (string | Class | Weapon)[]): Class[];
            weaponNameArray(arr: (string | Class | Weapon)[]): Weapon[];
            resolveServer(str: string): string;
            resolveWeapon(r: string | Class | Weapon): Weapon;
        };
        orderBy: object;
        verifiedClans: string[];
        gameIDregex: RegExp;
        averageStat(structure: 'class' | 'weapon', stat: string, arr?: (Class | Weapon)[], decimalDigits?: number): number | string;
        spinChance(spin: string, rarity: string, kr: number): number;
        stringifySettings(str: string, obj: {
            lineBreaks?: number;
            seperator?: string;
            includeControls?: boolean;
        }): string;
    };
}