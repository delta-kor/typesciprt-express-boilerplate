import { Request, Response } from 'express';
import { Todo, todoService } from '../../services/todo.service';

export interface PatchTodoPayload {
    type: 'toggle' | 'content';
    id: number;
    content?: string;
}

export enum GetTodosStatus {
    SUCCESS = 0
}

export enum PatchTodoStatus {
    SUCCESS = 0,
    INVALID_ID = -100,
    INVALID_TYPE = -200
}

export class TodoController {

    static getTodos(req: Request, res: Response): any {
        const todos: Todo[] = todoService.getTodos();
        res.json({
            resolved: true,
            status: GetTodosStatus.SUCCESS,
            result: todos
        });
        return true;
    }

    static patchTodo(req: Request, res: Response): any {
        const data: PatchTodoPayload = req.body;
        if(data.type === 'toggle') {
            const result = todoService.toggle(data.id);
            if(result === null) {
                res.json({
                    resolved: false,
                    status: PatchTodoStatus.INVALID_ID,
                    message: 'Id not found'
                });
                return false;
            }
            res.json({
                resolved: true,
                status: PatchTodoStatus.SUCCESS,
                result
            });
            return true;
        }
        if(data.type === 'content') {
            const result = todoService.content(data.id, <string>data.content);
            if(!result) {
                res.json({
                    resolved: false,
                    status: PatchTodoStatus.INVALID_ID,
                    message: 'Id not found'
                });
                return false;
            }
            res.json({
                resolved: true,
                status: PatchTodoStatus.SUCCESS,
                result: data.content
            });
            return true;
        }
        res.json({
            resolved: false,
            status: PatchTodoStatus.INVALID_TYPE,
            message: 'Invalid type'
        });
        return false;
    }

}
