import { Utils } from 'tslint';

declare module 'krunker.io.js' {
    interface IOrderBy {
        funds: 'player_funds',
        clans: 'player_clan',
        level: 'player_score',
        kills: 'player_kills',
        time: 'player_timeplayed',
        wins: 'player_wins',
        elo: 'player_elo',
        elo2: 'player_elo2',
        elo4: 'player_elo4',
        eggs: 'player_eventcount',
    }
    export interface ISkin {
        name: string;
        id: number | string;
        seas: number;
        rarity: string;
        rarityI: number;
        weapon: Weapon;
        keyW: String;
        tex: number;
        creator?: string;
        glow?: boolean;
    }
    export class Skin implements ISkin {
        constructor(client: Client, wResolvable: Class | Weapon | string, data: ISkin);
        public readonly client: Client;
        name: string;
        id: number | string;
        seas: number;
        rarity: string;
        rarityI: number;
        weapon: Weapon;
        url: string | null;
        creator?: string;
        glow?: boolean;
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
        maps: {
            author: string;
            name: string;
            votes: number;
            verified: boolean;
            fetch(): KrunkerMap;
        }[];
        joinedAt: Date;
        hacker: boolean;
        region: number;
        eggs: number;
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
            elo1: number;
            elo2: number;
            elo4: number;
            elo1Image: string;
            elo2Image: string;
            elo4Image: string;
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
        levelProgress?: number;
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
        level: number;
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
        public ping: number;
        public players: Map<string, Player>;
        public clans: Map<string, Clan>;
        public infected: Map<number, { date: Date; infected: number; }>;
        public fetchPlayer(username: string, options: {
            cache: boolean,
            raw: boolean,
            clan: boolean,
            mods: boolean
        }): Promise<Player>;
        public fetchInfected(days?: number): Promise<{ date: Date, infected: number }[]>;
        public getInfected(days?: number): { date: Date, infected: number }[] | Promise<{ date: Date, infected: number }[]>;
        public fetchGame(id: string): Promise<Game>;
        public fetchChangelog(): Promise<Changelog>;
        public fetchClan(name: string, options: {
            cache: boolean,
            raw: boolean
        }): Promise<Clan>;
        public fetchLeaderboard(orderBy?: keyof IOrderBy): Promise<object[]>;
        public getPlayer(nameOrID: string, options: {
            updateCache: boolean,
            raw: boolean,
            clan: boolean,
            mods: boolean
        }): Player | Promise<Player>;
        public getClan(nameOrID: string, options: {
            updateCache: boolean,
            raw: boolean
        }): Clan | Promise<Clan>;
        public getChangelog(): Changelog | Promise<Changelog>;
        public getLeaderboard(orderBy?: keyof IOrderBy): string[] | Promise<string[]>;
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
        }): Promise<Mod | null>;
        fetchMaps(options: {
            player?: string | Player | Clan;
            filter?: () => boolean;
            sort?: () => number;
            map?: (() => any) | string;
            count?: number;
        }): Promise<KrunkerMap[]>;
        getMap(options: {
            name?: string;
            id?: number;
            rank?: number;
        }): Promise<KrunkerMap | null>;
        fetchWeekly(): Promise<Weekly>;
        getWeekly(): Weekly | Promise<Weekly>;
    }
    export class Weekly {
        constructor(data: object);
        raw: {
            d: string;
            n: string;
            r: number;
            t: {
                l: string[];
                n: string;
                p: string;
            }[];
        }[];
        arr: {
            date: Date;
            name: string;
            region: number;
            teams: {
                players: string[];
                name: string;
                prize: string;
            }[];
        }[];
    }
    export class KrunkerMap {
        constructor(client: Client, data: object);
        public readonly client: Client;
        name: string;
        authorUsername: string;
        rank: number;
        id: number;
        votes: number;
        createdAt: Date;
        featured: boolean;
        verified: boolean;
        image: string;
        fetchAuthor(): Promise<Player>;
    }
    export class Mod {
        constructor(client: Client, data: object);
        public readonly client: Client;
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
        orderBy: {
            funds: 'player_funds',
            clans: 'player_clan',
            level: 'player_score',
            kills: 'player_kills',
            time: 'player_timeplayed',
            wins: 'player_wins',
            elo: 'player_elo',
            elo2: 'player_elo2',
            elo4: 'player_elo4',
            eggs: 'player_eventcount',
        };
        classes: string[];
        weapons: string[];
        spins: object;
        resolver: {
            classNameArray(arr: (string | Class | Weapon)[]): Class[];
            weaponNameArray(arr: (string | Class | Weapon)[]): Weapon[];
            resolveServer(str: string): string;
            resolveWeapon(r: string | Class | Weapon): Weapon;
        };
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
