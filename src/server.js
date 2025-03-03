import './db.js';
import express from 'express';
import session from 'express-session';
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/', rootRouter);
export default app;
