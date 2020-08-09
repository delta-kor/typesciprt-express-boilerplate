import * as express from 'express';
import { router as ApiRouter } from './routes/api';
import { router as WebRouter } from './routes/web';

export class Server {

    public application: express.Application;
    public port: number;

    constructor(port: number = 3000) {
        this.application = express();
        this.port = port;
        this.mount();
    }

    private mount() {
        this.mountRoutes();
    }

    private mountRoutes() {
        this.application.use('/api', ApiRouter);
        this.application.use(WebRouter);
    }

    listen(onStart?: (port: number) => void): void {
        this.application.listen(this.port, onStart);
    }

}
