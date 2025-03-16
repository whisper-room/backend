import express from 'express';
import { edit } from '../controllers/userControllers';
import { profileUpload } from '../middlewares';

const userRouter = express.Router();

userRouter.post('/edit', profileUpload.single('profile'), edit);

export default userRouter;
