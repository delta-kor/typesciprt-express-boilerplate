import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export class ExceptionController {

    static exception(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction): any {
        console.error(`Error occurred ${err}`);
        if(req.xhr) {
            res.status(500);
            res.json({
                resolved: false,
                status: -500,
                message: 'Internal server error'
            });
            return false;
        } else {
            res.status(500);
            res.render('error.pug');
            return false;
        }
    }

    static notFound(req: Request, res: Response): any {
        if(req.xhr) {
            res.status(404);
            res.json({
                resolved: false,
                status: -404,
                message: 'Page not found'
            });
            return false;
        } else {
            res.status(404);
            res.render('notFound.pug');
            return false;
        }
    }

}
