import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ClassController from './app/controllers/ClassController';
import StudentClassController from './app/controllers/StudentClassController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.post('/sessions', SessionController.store);

routes.post('/sessions/:id', SessionController.studentStore);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/classes', ClassController.index);
routes.post('/classes', ClassController.store);

routes.get('/classes/students', StudentClassController.index);
routes.post('/classes/student', StudentClassController.store);

export default routes;