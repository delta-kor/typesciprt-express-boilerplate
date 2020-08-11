import { Request, Response } from 'express';

export class IndexController {

    static main(req: Request, res: Response): any {
        res.render('main.pug');
        return true;
    }

}
