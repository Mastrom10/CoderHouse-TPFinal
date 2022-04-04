import Passport from passport;
import { JWT_SECRET } from '../../config.js';
import passportJWT from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';


Passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    