import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';

import { PORT } from './config/server';
import { setUpConnection } from './DB/index';

import authRoute from './routes/auth';
import articleRoute from './routes/article';

const app = express();
const db = setUpConnection();

db.once('open', () => {
    console.log('Connected to database');
});


app.use(cors());

app.use((req, res, next) => {
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
            message: error.message
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
