import express from 'express';
import { edit } from '../controllers/userControllers';
import { uploadFiles } from '../middlewares';

const userRouter = express.Router();

userRouter.post('/edit', uploadFiles.single('profile'), edit);

export default userRouter;
