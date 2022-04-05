import Passport from "passport";
import config from '../../config.js';
import { ExtractJwt } from 'passport-jwt';

import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';

import UsuarioAPI from '../api/UsuarioAPI.js';

const userAPI = new UsuarioAPI();

Passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await userAPI.getUserByEmail(email);
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            if (!user.isValidPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user, {message: 'Logged In Successfully'});
        } catch (error) {
            return done(error);
        }
    }
));

Passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const user = await userAPI.getUserByEmail(email);
            if (user) {
                return done(null, false, { message: 'That email is already taken.' });
            }
            const newUser = await userAPI.createUser(req.body);
            console.log(newUser);
            return done(null, newUser, { message: 'Account created successfully' });
        } catch (error) {
            return done(error);
        }
    }
));





Passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
    }, async (jwtPayload, done) => {
        try {
            const user = await userAPI.getUserById(jwtPayload.user.id);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

Passport.serializeUser((user, done) => {
    done(null, user.email);
});

Passport.deserializeUser((email, done) => {
    userAPI.getUserByEmail(email)
        .then(user => done(null, user))
        .catch(error => done(error, false));
});





export default Passport;

 
