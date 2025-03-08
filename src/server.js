import './db.js';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import rootRouter from './routers/rootRouter.js';

const app = express();

app.use(
  session({
    secret: 'myKey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.get('/add-one', (req, res, next) => {
  req.session.potato += 1;
  console.log(req.session.user);
  return res.send(`${req.session.id}\n${req.session.potato}`);
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/', rootRouter);
export default app;
