import Chatroom from "../models/Chatroom.js";

export const createRoom = async (req, res) => {
  console.log("📌 req.body:", req.body); // 🚨 요청 데이터 확인

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "❌ 요청 본문이 비어 있습니다!" });
  }

  const { roomname } = req.body;

  if (!roomname) {
    return res.status(400).json({ message: "❌ 채팅방 이름이 필요합니다." });
  }

  try {
    const Newroom = new Chatroom({ roomname });
    await Newroom.save(); 

    return res.status(201).json({ message: '채팅방 생성 완료' });
  } catch(error) {
    console.error("🚨 채팅방 생성 에러:", error);
    return res.status(500).json({ message: '채팅방 생성 실패' });
  }

};
