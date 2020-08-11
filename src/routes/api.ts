import { Router } from 'express';
import { TodoController } from '../controllers/api/todo.controller';
const router = Router();

router.get('/todo', TodoController.getTodos);

export { router };
