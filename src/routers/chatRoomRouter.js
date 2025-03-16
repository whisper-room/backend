import express from 'express';
import { createRoom, deleteRoom } from '../controllers/chatRoomControllers.js';
import { chatroomUpload } from '../middlewares';

const chatRoomRouter = express.Router();

chatRoomRouter.post('/createroom', chatroomUpload.single('roomimg'), createRoom);
chatRoomRouter.delete('/:roomId', deleteRoom);

export default chatRoomRouter;
