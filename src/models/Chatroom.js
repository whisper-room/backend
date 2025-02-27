import mongoose from 'mongoose';

const chatRoomSchema = new mongoose.Schema({
    roomname: { type: String, required: true }
    },);

const Chatroom = mongoose.model("Chatroom", chatRoomSchema);
export default Chatroom;