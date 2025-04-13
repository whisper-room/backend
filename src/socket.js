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
        // 해당 방의 모든 메시지에서 아직 userId가 추가되지 않은 메시지에 대해 추가
        await Chat.updateMany({ roomId, readBy: { $ne: userId } }, { $addToSet: { readBy: userId } });
        console.log(`User ${userId} marked messages as read in room ${roomId}`);
        // (선택 사항) 업데이트된 메시지를 방 전체에 전달하여 클라이언트들이 읽음 상태를 새로 고칠 수 있도록 함.
        const updatedMessages = await Chat.find({ roomId }).populate('sender', 'username profile');
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
