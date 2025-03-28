import express from 'express';
import { createRoom, deleteRoom, leaveRoom, addUser } from '../controllers/chatRoomControllers.js';
import { chatroomUpload } from '../middlewares';

const chatRoomRouter = express.Router();

chatRoomRouter.post('/create', chatroomUpload.single('roomimg'), createRoom);
chatRoomRouter.delete('/:roomId', deleteRoom);
chatRoomRouter.delete("/:roomId/leave", leaveRoom)
chatRoomRouter.patch("/:roomId/addUser", addUser);
export default chatRoomRouter;
