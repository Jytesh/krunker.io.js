declare module "krunker.io.js" {
    export class Player {
        constructor(data: string);
        username: string;
        level: number;
        levelProgress: number;
        score: number;
        displayName: string;
        id: string;
        lastPlayedClass?: Class;
        stats: {
            shots: number;
            hits: number;
            accuracy: number;
            nukes: number;
            kills: number;
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
            clan: string | null;
            followers: number;
            following: number;
        };
    }
    export class Changelog {
        constructor(text: string);
        versions: Array<{
            version: string;
            changes: Array<string>;
        }>;
        latestVersion: {
            version: string;
            changes: Array<string>;
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
    export class Client {
        constructor();
        private _connectToSocket(): void;
        private _disconnectFromSocket(): void;
        public fetchPlayer(username: string): Promise<Player>;
        public fetchGame(id: string): Promise<Game>;
        public fetchChangelog(): Promise<Changelog>;
        public getPlayer(nameOrID: string): Player|Promise<Player>;
        public getWeapon(name?: string): Weapon;
        public getClass(name?: string): Class;
    }
}
