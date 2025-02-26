import mongoose from 'mongoose';

const chatRoomSchema = new mongoose.Schema({
    roomname: { type: String, required: true }
    },);
  
const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
export default ChatRoom;