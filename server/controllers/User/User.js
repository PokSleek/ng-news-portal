import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import passport from 'passport';

import { User } from '../../models/User/User';

export const getLogin = (req, res) => {
    res.status(200).json({ message: 'Login page' });
};

export const logout = (req, res) => {
    req.logout();
    res.redirect('login');
};

export const postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/index',
        failureRedirect: '/login',
    })(req, res, next);
};

export const postRegistry = (req, res) => {
    const { nickname, name, email, password } = req.body.data;
    User
        .findOne({ nickname })
        .exec()
        .then(result => {
            if (result) {
                return res.status(404).json({message: 'Nickname is already registered'})
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    nickname,
                    name,
                    email,
                    password
                });
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user
                            .save()
                            .then(user => {
                                res.redirect('login');
                            })
                            .catch(err => console.log(err));
                    })
                )
            }
        })
        .catch(err => console.log(err));
};
