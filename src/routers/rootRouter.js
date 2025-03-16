import express from 'express';
import { join, login, logout, session } from '../controllers/userControllers';
import { profileUpload } from '../middlewares';

const rootRouter = express.Router();

rootRouter.post('/join', profileUpload.single('profile'), join);
rootRouter.post('/login', login);
rootRouter.get('/session', session);
rootRouter.post('/logout', logout);

export default rootRouter;
