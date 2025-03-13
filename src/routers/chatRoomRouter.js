import express from 'express';
import { createRoom, deleteRoom } from '../controllers/chatRoomControllers.js';

const chatRoomRouter = express.Router();

chatRoomRouter.post("/createroom", createRoom);
chatRoomRouter.delete("/:roomId", deleteRoom);

export default chatRoomRouter;