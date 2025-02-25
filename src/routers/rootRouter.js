import express from 'express';
import { join, login, logout } from '../controllers/userControllers';

const rootRouter = express.Router();

rootRouter.post('/join', join);
rootRouter.post('/login', login);
rootRouter.post('/logout', logout);

export default rootRouter;
