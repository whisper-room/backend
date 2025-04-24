import Chat from './models/Chat';
import Chatroom from './models/Chatroom.js';

export default function socketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('✅ 유저 연결됨:', socket.id);

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`${roomId} 채팅방에 입장했습니다.`);
    });

    socket.on('sendMessage', async ({ roomId, sender, text }) => {
      try {
        const newMessage = new Chat({ roomId, sender, text, readBy: [sender] });
        await newMessage.save();

        const populatedMessage = await newMessage.populate('sender', 'username profile');

        // 🟡 채팅방 멤버 수 계산
        const chatRoom = await Chatroom.findById(roomId);
        const totalMembers = chatRoom ? chatRoom.members.length : 0;
        const unreadCount = totalMembers - 1; // 보낸 사람은 이미 읽음

        io.to(roomId).emit('receiveMessage', {
          ...populatedMessage.toObject(),
          unreadCount,
        });
      } catch (error) {
        console.error('🚨 메시지 저장 실패:', error);
      }
    });

    // 클라이언트에서 읽음 처리를 요청하는 이벤트 추가
    socket.on('markAsRead', async ({ roomId, userId }) => {
      try {
        await Chat.updateMany({ roomId, readBy: { $ne: userId } }, { $addToSet: { readBy: userId } });
        console.log(`User ${userId} marked messages as read in room ${roomId}`);

        const chatRoom = await Chatroom.findById(roomId);
        const totalMembers = chatRoom ? chatRoom.members.length : 0;

        const updatedMessages = await Chat.find({ roomId }).populate('sender', 'username profile');

        // unreadCount 계산해서 메시지마다 넣어주기
        const messagesWithUnread = updatedMessages.map((msg) => {
          const unreadCount = totalMembers - (msg.readBy?.length || 0);
          return {
            ...msg.toObject(),
            unreadCount,
          };
        });

        io.to(roomId).emit('updateMessages', messagesWithUnread);
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    });

    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
      console.log(`🚪 유저가 ${roomId} 채팅방에서 나감`);
    });
  });
}
