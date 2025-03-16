import Chatroom from '../models/Chatroom.js';
import User from '../models/User.js';

export const createRoom = async (req, res) => {
  console.log('📌 req.body:', req.body);

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: '❌ 요청 본문이 비어 있습니다!' });
  }

  const { roomname } = req.body;
  const usernames = JSON.parse(req.body.usernames);
  const roomimg = req.file ? req.file.path : '';

  if (!roomname) {
    return res.status(400).json({ message: '❌ 채팅방 이름이 필요합니다.' });
  }

  if (!usernames) {
    return res.status(400).json({ message: '❌ 최소 한 명의 유저를 초대해야합니다.' });
  }

  try {
    const users = await User.find({ username: { $in: usernames } });
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

    await Chatroom.findByIdAndDelete(roomId);


    return res.status(200).json({message: "✅ 채팅방 삭제 완료!"});
    
  } catch (error) {
    console.error('🚨 채팅방 삭제 에러:', error);
    return res.status(500).json({ message: '❌ 채팅방 삭제 실패', error: error.message });
  }
};
