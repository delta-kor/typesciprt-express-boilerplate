import { promises as fs } from 'fs';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as mustache from 'mustache';
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

    private mount(): void {
        this.mountMiddlewares();
        this.mountRoutes();
    }

    private mountMiddlewares(): void {
        this.application.engine('html', async (path: string, options: any, callback: any) => {
            const file: Buffer = await fs.readFile(path);
            const rendered: string = mustache.render(file.toString('utf8'), options.view, options.paritals);
            return callback(null, rendered);
        });
        this.application.set('view engine', 'mu');

        this.application.use(express.static('public'));
        this.application.use(express.json());
        this.application.use(express.urlencoded({ extended: true }));
        this.application.use(cookieParser());
    }

    private mountRoutes(): void {
        this.application.use('/api', ApiRouter);
        this.application.use(WebRouter);
    }

    listen(onStart?: (port: number) => void): void {
        this.application.listen(this.port, onStart);
    }

}
