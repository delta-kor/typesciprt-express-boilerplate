import { Router } from 'express';
import { ExceptionController } from '../controllers/exception.controller';

const router = Router();

router.all('*', ExceptionController.notFound);

const exception = ExceptionController.exception;

export { exception, router }
