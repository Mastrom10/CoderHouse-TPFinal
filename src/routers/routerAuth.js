import express from 'express'
import ControladorAuth from '../controlador/ControladorAuth.js'
import Passport from "passport";
import { checkAuthentication } from '../Middlewares/Autorizacion.js'


const router = express.Router()

export default class RouterAuth {

    constructor() {
        this.controlador = new ControladorAuth();
    }

    getRouter() {
        //router.post('/login', this.controlador.login);
        router.post('/login', Passport.authenticate('login'), this.controlador.login);

        router.post('/logout', this.controlador.logout);
        //router.post('/register', this.controlador.register);
        router.post('/signup', Passport.authenticate('signup'), this.controlador.register);
        //info user
        router.get('/info', this.controlador.info);
        // Login via JWT
        router.get('/loginJWT', Passport.authenticate('jwt'), (req, res) => {
            res.send('LoggedIn Successfully via JWT'); 
        })
        //test protected route
        router.get('/protected', checkAuthentication, (req, res) => {
            res.send('protected route checkAuthentication');
        })

        return router;
    }
}









