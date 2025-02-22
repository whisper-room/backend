import express from 'express';
import { join,logout } from '../controllers/userControllers';

const rootRouter = express.Router();

rootRouter.post('/join', join);
rootRouter.post('/logout', logout);

export default rootRouter;
