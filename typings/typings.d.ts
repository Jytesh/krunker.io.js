declare module "krunker.io.js" {
    export default {
        Client: class {
            private _connectToSocket(): void;
            private _disconnectFromSocket(): void;
            public fetchPlayer(username: string): Promise<Player>;
            public fetchGame(id: string): Promise<Game>;
            public fetchChangelog(): Promise<Changelog>;
            public getPlayer(nameOrID: string): Player|Promise<Player>;
        }
    }
}
