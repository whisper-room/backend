import express from 'express';
import { createRoom } from '../controllers/chatRoomControllers.js';

const chatRoomRouter = express.Router();

chatRoomRouter.post("/createroom", createRoom);

export default chatRoomRouter;