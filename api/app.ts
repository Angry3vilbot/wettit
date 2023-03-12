import createError from 'http-errors';
import dotenv from 'dotenv'
import express, { NextFunction, Response, Request } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from "mongoose";

import postRouter from './routes/post';
import userRouter from './routes/user';
import subwettitRouter from './routes/subwettit';

dotenv.config()

const mongoDB = process.env.MONGO_URI
mongoose.connect(mongoDB!)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB Connection Error: '))
db.once('connection', console.log.bind(console, 'connected'))

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/subwettits', subwettitRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = 8000
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;
