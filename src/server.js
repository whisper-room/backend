import './db.js';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import rootRouter from './routers/rootRouter.js';

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
export default app;
