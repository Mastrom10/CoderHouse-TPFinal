import Router from 'express';

import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config.js';

import  Passport  from 'passport';

const routerAuth = Router();

routerAuth.post('/login', (req, res, next) => {
    Passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ error: 1, descripcion: 'Usuario o contraseña incorrectos' });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                return next(err);
            }
            const token = jwt.sign({ user }, JWT_SECRET);
            return res.json({ user, token });
        });
    })(req, res, next);
} );
