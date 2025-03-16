import Chat from "../models/Chat.js"; 

export default function socketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("✅ 유저 연결됨:", socket.id);

    // 유저가 특정 채팅방에 입장
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`👤 유저가 ${roomId} 채팅방에 입장`);
    });

    //메시지 보내기 & 저장
    socket.on("sendMessage", async ({ roomId, sender, text }) => {
      console.log(`📩 메시지 도착 [방: ${roomId}]`, text);

      try {
        // MongoDB에 메시지 저장
        const newMessage = new Chat({ roomId, sender, text }); // ✅ `Message` → `Chat`
        await newMessage.save();

        // 같은 방의 모든 유저에게 메시지 전송
        io.to(roomId).emit("receiveMessage", { sender, text });
      } catch (error) {
        console.error("🚨 메시지 저장 실패:", error);
      }
    });

    socket.on("leaveRoom", (roomId) => {
      socket.leave(roomId);
      console.log(`🚪 유저가 ${roomId} 채팅방에서 나감`);
    });

    socket.on("disconnect", () => {
      console.log("❌ 유저 연결 해제:", socket.id);
    });
  });
}
