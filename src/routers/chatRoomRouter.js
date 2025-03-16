import express from 'express';
import { createRoom, deleteRoom } from '../controllers/chatRoomControllers.js';
import { uploadFiles } from '../middlewares';

const chatRoomRouter = express.Router();

chatRoomRouter.post("/create", uploadFiles.single("roomimg"), createRoom);
chatRoomRouter.delete("/:roomId", deleteRoom);

export default chatRoomRouter;