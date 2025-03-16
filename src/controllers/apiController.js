import Chatroom from '../models/Chatroom.js';

export const chatlist = async (req, res) => {
  try {
    const userId = req.session.user?._id;

    if (!userId) {
      return res.status(401).json({ message: '유저 세션을 찾을 수 없습니다.' });
    }

    const rooms = await Chatroom.find({ members: userId }).select('roomname roomimg');

    res.status(200).json(rooms);
  } catch (err) {
    console.error('Error :', err);
    res.status(500).json({ message: '서버 에러!' });
  }
};
