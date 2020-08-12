import { Request, Response } from 'express';
import { Todo, todoService } from '../../services/todo.service';

export class TodoController {

    static getTodos(req: Request, res: Response): any {
        const todos: Todo[] = todoService.getTodos();
        res.json({
            resolved: true,
            status: 0,
            result: todos
        });
        return true;
    }

}
