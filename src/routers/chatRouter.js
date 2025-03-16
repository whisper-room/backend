import express from "express";
import { sendMessage, getMessages } from "../controllers/chatControllers.js";

const chatRouter = express.Router();

chatRouter.post("/", sendMessage); // 메시지 저장
chatRouter.get("/:roomId", getMessages); // 특정 채팅방의 메시지 가져오기

export default chatRouter;
