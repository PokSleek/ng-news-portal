import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import { setUpConnection } from './DB/index'
import { PORT } from './config/server';

import newsRoute from './routes/news';
import authRoute from './routes/auth';


const app = express();
const db = setUpConnection();

db.once('open', () => {
  console.log('Connected to database');
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/auth', authRoute);
app.use('/news', newsRoute);


app.use('/index', (req, res) => {
    res.status(200).json({ message: 'Index page' });
});

app.use((req, res, next) => {
  const error = new Error('Content not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      status: error.status,
      message: error.message,
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
