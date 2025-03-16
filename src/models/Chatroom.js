import mongoose from 'mongoose';

const chatRoomSchema = new mongoose.Schema({
  roomname: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  roomimg: { type: String, default: null },
});
const Chatroom = mongoose.model('Chatroom', chatRoomSchema);
export default Chatroom;
