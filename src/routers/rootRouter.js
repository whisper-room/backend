import express from 'express';
import { join, login, logout } from '../controllers/userControllers';
import { uploadFiles } from '../middlewares';

const rootRouter = express.Router();

rootRouter.post('/join', uploadFiles.single('profile'), join);
rootRouter.post('/login', login);
rootRouter.post('/logout', logout);

export default rootRouter;
