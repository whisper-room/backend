import express from 'express';
import { join } from '../controllers/userControllers';

const rootRouter = express.Router();

rootRouter.post('/join', join);

export default rootRouter;
