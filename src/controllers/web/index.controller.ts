import { Request, Response } from 'express';

export class IndexController {

    static main(req: Request, res: Response): void {
        res.render('main.html');
    }

}
