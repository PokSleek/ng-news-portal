import passport from 'passport-facebook';
import mongoose from 'mongoose';

import { User } from '../../models/User/User';

const FbStrategy = passport.Strategy;

const FACEBOOK_CLIENT_ID = '459381194781039';
const FACEBOOK_CLIENT_SECRET = 'c615dec6d7292d47b9277002ca395682';
const FACEBOOK_CALLBACK_URL = 'http://localhost:7000/auth/fb/login';

export const setPassportFb = passport => {
    passport.use(
        new FbStrategy(
            {
                clientID: FACEBOOK_CLIENT_ID,
                clientSecret: FACEBOOK_CLIENT_SECRET,
                callbackURL: FACEBOOK_CALLBACK_URL,
                profileFields: ['first_name', 'last_name']
            },
            (accessToken, refreshToken, profile, done) => {
                const { first_name, last_name } = profile._json;
                const userData = {
                    _id: new mongoose.Types.ObjectId(),
                    nickname: `${first_name} ${last_name}`,
                    email: 'FACEBOOK',
                    name: first_name,
                    password: 'FACEBOOK',
                };
                new User(userData).save();
                done(null, profile);
            }
        )
    );

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
};
