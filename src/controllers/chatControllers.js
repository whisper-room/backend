import Chat from '../models/Chat.js';
import Chatroom from '../models/Chatroom.js';
import { Server } from 'socket.io';

//전송
export const sendMessage = async (req, res) => {
  const { roomId, sender, text } = req.body;
  const img_url = req.file ? req.file.path : '';
  console.log(img_url);

  if (!roomId || !sender || (!text && !img_url)) {
    return res.status(400).json({ message: '❌ 메시지를 입력하세요.' });
  }

  try {
    const newMessage = new Chat({ roomId, sender, text, img_url, readBy: [sender] });
    await newMessage.save();

    const populatedMessage = await newMessage.populate('sender', 'username profile');

    // 같은 채팅방(roomId)에 있는 모든 사용자에게 메시지를 뿌림
    req.app.get('io').to(roomId).emit('receiveMessage', populatedMessage);

    return res.status(201).json({ message: '✅ 메시지 전송 완료', newMessage });
  } catch (error) {
    console.error('🚨 메시지 저장 오류:', error);
    return res.status(500).json({ message: '❌ 메시지 저장 실패' });
  }
};

export const getMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const chatRoom = await Chatroom.findById(roomId);
    const totalMembers = chatRoom ? chatRoom.members.length : 0;

    const messages = await Chat.find({ roomId }).populate('sender', 'username profile');
    const messagesWithUnread = messages.map((message) => {
      const unreadCount = totalMembers - message.readBy.length;
      return { ...message.toObject(), unreadCount };
    });

    return res.status(200).json({ messages });
  } catch (error) {
    console.error('🚨 메시지 불러오기 오류:', error);
    return res.status(500).json({ message: '❌ 메시지 불러오기 실패' });
  }
};
