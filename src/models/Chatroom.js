import mongoose from 'mongoose';

const chatRoomSchema = new mongoose.Schema({
  roomname: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  roomimg: { type: String, default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //채팅방 생성자
});
const Chatroom = mongoose.model('Chatroom', chatRoomSchema);
export default Chatroom;
