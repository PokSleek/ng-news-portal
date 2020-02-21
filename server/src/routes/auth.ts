import express from 'express';
import session from 'express-session';
import passport from 'passport';

import { setPassportLocal } from '../controllers/Auth/Auth';
import { getLogin, logout, postLogin, postRegistry } from '../controllers/User/User';

import fbRouter from './fbAuth';


const router = express.Router();

setPassportLocal(passport);

router.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

router.use('/fb', fbRouter);

router.get('/login', getLogin);
router.post('/login', postLogin);
router.post('/registry', postRegistry);
router.get('/logout', logout);

export default router;
