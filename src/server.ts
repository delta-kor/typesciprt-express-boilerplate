import * as express from 'express';

export class Server {

    public application: express.Application;
    public port: number;

    constructor(port: number = 30000) {
        this.application = express();
        this.port = port;
    }

    listen(onStart?: (port: number) => void): void {
        this.application.listen(onStart);
    }

}
