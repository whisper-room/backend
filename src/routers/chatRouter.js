import express from "express";
import { sendMessage, getMessages } from "../controllers/chatControllers.js";

const chatRouter = express.Router();

chatRouter.post("/", sendMessage); 
chatRouter.get("/:roomId", getMessages); 

export default chatRouter;