import * as http from 'http';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { router as ApiRouter } from './routes/api';
import { router as WebRouter } from './routes/web';
import { router as ExceptionRouter, exception } from './routes/exception';

export class Server {

    private application: express.Application;
    private server: http.Server;
    public port: number;

    constructor(port: number = 3000) {
        this.application = express();
        this.server = http.createServer(this.application);
        this.port = port;
        this.mount();
    }

    private mount(): void {
        this.mountMiddlewares();
        this.mountRoutes();
    }

    private mountMiddlewares(): void {
        this.application.set('view engine', 'pug');

        this.application.use(express.static('public'));
        this.application.use(express.json());
        this.application.use(express.urlencoded({ extended: true }));
        this.application.use(cookieParser());
    }

    private mountRoutes(): void {
        this.application.use('/api', ApiRouter);
        this.application.use(WebRouter);
        this.application.use(ExceptionRouter);
        this.application.use(exception);
    }

    listen(onStart?: (port: number) => void): void {
        this.server.listen(this.port);
        onStart && onStart(this.port);
    }

}
