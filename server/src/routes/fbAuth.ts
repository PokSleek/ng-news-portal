import express from 'express';
import session from 'express-session';
import passport from 'passport';

import { setPassportFb } from '../controllers/Auth/FbAuth';
import { logout } from '../controllers/User/User';


const router = express.Router();

setPassportFb(passport);

router.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/loginpage', passport.authenticate('facebook'));

router.get('/login', passport.authenticate('facebook',
  {
    successRedirect: '/index',
    failureRedirect: '/loginpage'
  })
);

router.get('/logout', logout);

export default router;
