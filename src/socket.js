import Chat from './models/Chat';

export default function socketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('✅ 유저 연결됨:', socket.id);

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`${roomId} 채팅방에 입장했습니다.`);
    });

    socket.on('sendMessage', async ({ roomId, sender, text }) => {
      console.log(`📩 메시지 도착 [방: ${roomId}]`, text);

      try {
        const newMessage = new Chat({ roomId, sender, text, readBy: [sender] });
        await newMessage.save();

        // sender 정보 populate
        const populatedMessage = await newMessage.populate('sender', 'username profile');

        io.to(roomId).emit('receiveMessage', {
          sender: populatedMessage.sender,
          text: populatedMessage.text,
        });
      } catch (error) {
        console.error('🚨 메시지 저장 실패:', error);
      }
    });

    // 클라이언트에서 읽음 처리를 요청하는 이벤트 추가
    socket.on('markAsRead', async ({ roomId, userId }) => {
      try {
        // 메시지 읽음 처리
        await Chat.updateMany({ roomId, readBy: { $ne: userId } }, { $addToSet: { readBy: userId } });

        // 방 내 모든 메시지 가져오기
        const messages = await Chat.find({ roomId }).populate('sender', 'username profile');

        // 방에 있는 사용자 수 계산
        const clients = await io.in(roomId).fetchSockets();
        const totalUsers = clients.length;

        // 각 메시지마다 unreadCount 재계산
        const updatedMessages = messages.map((msg) => {
          const unreadCount = Math.max(totalUsers - msg.readBy.length, 0);
          return {
            ...msg.toObject(),
            unreadCount,
          };
        });

        // 클라이언트에 업데이트된 메시지들 전송
        io.to(roomId).emit('updateMessages', updatedMessages);
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
