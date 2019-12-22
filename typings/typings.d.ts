declare module "krunker.io.js" {
    declare interface Class {
        health: number;
        name: string;
        secondary: boolean;
        weapon: Weapon;
        toString(): string;
    }
    declare interface Client {
        private _connectToSocket(): void;
        private _disconnectFromSocket(): void;
        public fetchPlayer(username: string): Promise<Player>;
        public fetchGame(id: string): Promise<Game>;
        public fetchChangelog(): Promise<Changelog>;
        public getPlayer(nameOrID: string): Player|Promise<Player>;
    }

    export default Client;
}
