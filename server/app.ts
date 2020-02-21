import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';

import { PORT } from './src/config/server';
import { setUpConnection } from './src/DB';

import authRoute from './src/routes/auth';
import articleRoute from './src/routes/article';

const app = express();
const db = setUpConnection();

db.once('open', () => {
  console.log('Connected to database');
});


app.use(cors());

app.use((req: Request, res: Response, next: NextFunction): void => {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/auth', authRoute);
app.use('/news', articleRoute);


app.use('/index', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Index page' });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Route Not found');
  next({
    status: 404,
    error,
  });
});

app.use((err: { status: number, error: Error }, req: Request, res: Response) => {
  res.status(err.status || 500).json({
    status: err.status,
    error: err.error,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
