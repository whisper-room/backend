import express from 'express';
import { sendMessage, getMessages } from '../controllers/chatControllers.js';
import { chatUpload } from '../middlewares.js';

const chatRouter = express.Router();

chatRouter.post('/', chatUpload.single('img_url'), sendMessage);
chatRouter.get('/:roomId', getMessages);

export default chatRouter;
