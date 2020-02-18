import bcrypt from 'bcryptjs';
import passportLocal from 'passport-local';

import { User } from '../../models/User/User';

const LocalStrategy = passportLocal.Strategy;

export const setPassportLocal = passport => {
	passport.use(
		new LocalStrategy({ usernameField: 'nickname' }, (nickname, password, done) => {
			User
				.findOne({ nickname })
				.then(user => {
					if (!user) {
						return done(null, false, { message: 'This nickname is not registered' });
					}

                    bcrypt.compare(password, user.password, (err, isMatch) => {
	                    if (err) throw err;

	                    if (isMatch) {
		                    return done(null, user);
	                    } else {
		                    return done(null, false, { message: 'Password incorrect' });
	                    }
                    });
				})
				.catch(err => console.log(err));
		}),
	);

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
