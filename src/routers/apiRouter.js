import express from 'express';
import { chatlist } from '../controllers/apiController';

const apiRouter = express.Router();

apiRouter.get('/chatlist', chatlist);

export default apiRouter;
