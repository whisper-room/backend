import express from 'express';
import { join, login, logout, session } from '../controllers/userControllers';
import { uploadFiles } from '../middlewares';

const rootRouter = express.Router();

rootRouter.post('/join', uploadFiles.single('profile'), join);
rootRouter.post('/login', login);
rootRouter.get('/session', session);
rootRouter.post('/logout', logout);

export default rootRouter;
