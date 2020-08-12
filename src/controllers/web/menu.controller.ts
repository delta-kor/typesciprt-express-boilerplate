import { Request, Response } from 'express';
import { Todo, todoService } from '../../services/todo.service';

export class MenuController {

    static todo(req: Request, res: Response): any {
        const todos: Todo[] = todoService.getTodos();
        res.render('todo.pug', { todos });
        return true;
    }

}
