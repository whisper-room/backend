import './db.js';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import rootRouter from './routers/rootRouter.js';
import chatRoomRouter from './routers/chatRoomRouter.js';
import userRouter from './routers/userRouter.js';
import apiRouter from './routers/apiRouter.js';
import chatRouter from './routers/chatRouter.js';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5000', // 프론트엔드 주소
    credentials: true, // 세션 쿠키를 허용
  })
);
app.use(
  session({
    secret: 'myKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/', rootRouter);
app.use('/chatroom', chatRoomRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);
app.use('/chat', chatRouter);
export default app;
