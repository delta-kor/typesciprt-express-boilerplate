import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export class ExceptionController {

    static exception(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
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
            res.render('error.html');
            return false;
        }
    }

}
