import Chat from "../models/Chat.js";

export const sendMessage = async (req, res) => {
  const { roomId, sender, text } = req.body;

  if (!roomId || !sender || !text) {
    return res.status(400).json({ message: "❌ 모든 필드를 입력하세요." });
  }

  try {
    const newMessage = new Chat({ roomId, sender, text });
    await newMessage.save();

    return res.status(201).json({ message: "✅ 메시지 전송 완료", newMessage });
  } catch (error) {
    console.error("🚨 메시지 저장 오류:", error);
    return res.status(500).json({ message: "❌ 메시지 저장 실패" });
  }
};

export const getMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const messages = await Chat.find({ roomId }).populate("sender", "username");
    return res.status(200).json({ messages });
  } catch (error) {
    console.error("🚨 메시지 불러오기 오류:", error);
    return res.status(500).json({ message: "❌ 메시지 불러오기 실패" });
  }
};
