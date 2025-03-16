import express from 'express';
import { createRoom, deleteRoom,searchRoom } from '../controllers/chatRoomControllers.js';
import { chatroomUpload } from '../middlewares';

const chatRoomRouter = express.Router();

chatRoomRouter.post('/create', chatroomUpload.single('roomimg'), createRoom);
chatRoomRouter.get("/search", searchRoom);
chatRoomRouter.delete('/:roomId', deleteRoom);

export default chatRoomRouter;
