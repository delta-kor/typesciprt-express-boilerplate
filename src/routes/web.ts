import { Router } from 'express';
import { IndexController } from '../controllers/web/index.controller';
import { MenuController } from '../controllers/web/menu.controller';
const router = Router();

router.get('/', IndexController.main);
router.get('/todo', MenuController.todo);

export { router };
