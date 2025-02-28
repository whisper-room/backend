import './db.js';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import rootRouter from './routers/rootRouter.js';

const app = express();

app.use(
  session({
    secret: 'myKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use('/', rootRouter);
export default app;
