import Chatroom from '../models/Chatroom.js';
import Chat from '../models/Chat.js';
import User from '../models/User.js';

export const createRoom = async (req, res) => {
  console.log('📌 req.body:', req.body);

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: '❌ 요청 본문이 비어 있습니다!' });
  }

  const { roomname, usernames } = req.body;
  const roomimg = req.file ? req.file.path : '';

  if (!roomname) {
    return res.status(400).json({ message: '❌ 채팅방 이름이 필요합니다.' });
  }

  if (!usernames) {
    return res.status(400).json({ message: '❌ 최소 한 명의 유저를 초대해야합니다.' });
  }

  try {
    const parsedUsernames = JSON.parse(usernames);
    console.log('✅ 변환된 usernames:', parsedUsernames);

    const users = await User.find({ username: { $in: parsedUsernames } });
    const userIds = users.map((user) => user._id);

    const Newroom = new Chatroom({
      roomname,
      members: userIds,
      roomimg: roomimg || null,
    });
    await Newroom.save();

    return res.status(201).json({ message: '채팅방 생성 완료', room: Newroom });
  } catch (error) {
    console.error('🚨 채팅방 생성 에러:', error);
    return res.status(500).json({ message: '채팅방 생성 실패' });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Chatroom.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: '❌ 채팅방을 찾을 수 없습니다.' });
    }

    await Chat.deleteMany({ roomId });
    await Chatroom.findByIdAndDelete(roomId);

    return res.status(200).json({ message: '✅ 채팅방 삭제 완료!' });
  } catch (error) {
    console.error('🚨 채팅방 삭제 에러:', error);
    return res.status(500).json({ message: '❌ 채팅방 삭제 실패', error: error.message });
  }
};

export const leaveRoom = async (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: '❌ 유저 ID가 필요합니다.' });
  }
  try {
    const chatroom = await Chatroom.findById(roomId);
    if (!chatroom) {
      return res.status(400).json({ message: '❌ 채팅방을 찾을 수 없습니다.' });
    }

    if (!chatroom.members.includes(userId)) {
      return res.status(400).json({ message: '❌ 해당 유저는 채팅방에 없습니다.' });
    }

    chatroom.members = chatroom.members.filter((member) => member.toString() !== userId);
    await chatroom.save();

    return res.status(200).json({ message: '✅ 채팅방 나가기 완료!', chatroom });
  } catch (error) {
    console.error('🚨 채팅방 나가기 에러:', error);
    return res.status(500).json({ message: '❌ 채팅방 나가기 실패' });
  }
};

export const addUser = async (req,res) => {
  const { username} = req.body;
  const { roomId } = req.params;

  if (!username) {
    return res.status(400).json({ message: "❌ 초대할 유저 닉네임이 필요합니다." });
  }

  try {
    const chatroom = await Chatroom.findById(roomId);
    if (!chatroom) {
      return res.status(404).json({ message: "❌ 채팅방을 찾을 수 없습니다." });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "❌ 해당 닉네임의 유저가 존재하지 않습니다." });
    }

    if (chatroom.members.includes(user._id)) {
      return res.status(400).json({ message: "⚠️ 이미 채팅방에 있는 유저입니다." });
    }

    chatroom.members.push(user._id);
    await chatroom.save();

    return res.status(200).json({
      message: "✅ 유저 초대 완료!",
      chatroom,
    });
  } catch (error) {
    console.error("🚨 유저 초대 에러:", error);
    return res.status(500).json({ message: "❌ 유저 초대 실패" });
  }
};