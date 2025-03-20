import 'dotenv/config';
import './db.js';
import http from 'http';
import { Server } from 'socket.io';
import app from './server';
import socketHandlers from './socket.js';

const PORT = 3000;

// 1. HTTP 서버 생성
const server = http.createServer(app);

// 2. Socket.IO 서버 생성
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5000', // 프론트 주소
    credentials: true,
  },
});

// 3. 소켓 이벤트 등록
socketHandlers(io);

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

server.listen(PORT, handleListening);
