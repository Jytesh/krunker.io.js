declare module "krunker.io.js" {
    export interface Client {
        private _connectToSocket(): void;
        private _disconnectFromSocket(): void;
    }
}
