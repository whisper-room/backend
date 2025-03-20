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
        const newMessage = new Chat({ roomId, sender, text });
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

    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
      console.log(`🚪 유저가 ${roomId} 채팅방에서 나감`);
    });
  });
}
