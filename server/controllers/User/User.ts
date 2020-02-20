import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import { User } from '../../models';

export const getLogin = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Login page' });
};

export const logout = (req: Request, res: Response) => {
    req.logout();
    res.redirect('login');
};

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', {
        successRedirect: '/index',
        failureRedirect: '/login',
    })(req, res, next);
};

export const postRegistry = (req: Request, res: Response) => {
    const { nickname, name, email, password } = req.body.data;
    User
        .findOne({ nickname })
        .exec()
        .then(result => {
            if (result) {
                return res.status(404).json({ message: 'Nickname is already registered' });
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    nickname,
                    name,
                    email,
                    password
                });
                bcrypt.genSalt(10, (err: Error, salt: string) =>
	                bcrypt.hash(user.password.toString(), salt, (err: Error, hash: string) => {
		                if (err) throw err;
		                user.password = hash;
		                user
			                .save()
			                .then(user => {
				                res.redirect('login');
			                })
			                .catch(err => console.log(err));
	                })
                );
            }
        })
        .catch((err: Error) => console.log(err));
};
