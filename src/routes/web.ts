import { Router } from 'express';
import { IndexController } from '../controllers/web/index.controller';
const router = Router();

router.get('/', IndexController.main);

export { router };
