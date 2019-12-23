declare module "krunker.io.js" {
    declare interface weaponDmg {
        damage: number;
        dropoff: number;
        toString(): string;
        valueOf(): number;
    }
    declare interface players {
        players: number;
        max: number;
        toString(): string;
        valueOf(): number;
    }

    declare class Weapon {
        name: string;
        toString(): string;
        class: string?;
        swapTime: number;
        aimSpeed: number;
        speedMultiplier: number;
        ammo: number?;
        reloadTime: number?;
        damage: weaponDmg;
        range: number;
        rateOfFire: number;
        spread: number?;
        zoom: number?;
        recoil: number?;
        automatic: boolean;
        baseScore: number;
        sight: string?;
        devNumber: number;
        getSkin(n: number)?: string;
    }
    declare class Class {
        health: number;
        name: string;
        secondary: boolean;
        weapon: Weapon;
        toString(): string;
    }
    declare class Game {
        id: string;
        players: players;
        gameMode: string;
        map: string;
        custom: boolean;
    }
    declare class Client {
        private _connectToSocket(): void;
        private _disconnectFromSocket(): void;
        public fetchPlayer(username: string): Promise<Player?>;
        public fetchGame(id: string): Promise<Game?>;
        public fetchChangelog(): Promise<Changelog>;
        public getPlayer(nameOrID: string): Player?|Promise<Player?>;
        public getWeapon(name?: string): Weapon?;
        public getClass(name?: string): Class?;
    }

    export default Client;
}
