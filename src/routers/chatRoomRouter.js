import express from 'express';
import { createRoom, deleteRoom, leaveRoom, addUser, patchEdit } from '../controllers/chatRoomControllers.js';
import { chatroomUpload } from '../middlewares';

const chatRoomRouter = express.Router();

chatRoomRouter.post('/create', chatroomUpload.single('roomimg'), createRoom);
chatRoomRouter.patch('/:roomId', chatroomUpload.single('roomimg'), patchEdit);
chatRoomRouter.delete('/:roomId', deleteRoom);
chatRoomRouter.delete('/:roomId/leave', leaveRoom);
chatRoomRouter.patch('/:roomId/addUser', addUser);
export default chatRoomRouter;
