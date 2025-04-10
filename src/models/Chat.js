import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Chatroom", required: true }, // 채팅방 ID
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 보낸사람
  text: { type: String, required: true }, // 메시지내용
  img_url : {type: String, default: null },
  sentAt: { type: Date, default: Date.now }, // 보낸시간
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] //읽은 사용자들 id 목록
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;