import UsuarioAPI from "../api/UsuarioAPI.js";

import jwt from 'jsonwebtoken';
import config from '../../config.js';
import UsuarioDTO from '../Model/DTOs/UsuarioDTO.js';


export default class ControladorAuth {
    
        constructor() {
            this.usuarioAPI = new UsuarioAPI();
            
        }
    
        login(req, res)  {
                console.log(req.user);
                const miUsuarioDTO = new UsuarioDTO();
                const user = miUsuarioDTO.toJSONsinPassword(req.user);
                const token = jwt.sign({user}, config.JWT_SECRET);
                user.token = token;
                return res.json(user);
            
        }
    
        logout(req, res) {
            //TODO: implementar (no está en los requerimientos)
            req.logout();
            //redirigir a login
            return res.redirect('/');
        }
    
        register(req, res) {
            const miUsuarioDTO = new UsuarioDTO();
            const user = miUsuarioDTO.toJSONsinPassword(req.user);
            const token = jwt.sign({user}, config.JWT_SECRET);
            user.token = token;
            return res.json(user); 
        }

        info(req, res) {
            if (req.user) {
                const miUsuarioDTO = new UsuarioDTO();
                const user = miUsuarioDTO.toJSONsinPassword(req.user);
                const token = jwt.sign({user}, config.JWT_SECRET);
                user.token = token;
                return res.json(user);
            } else {
                return res.status(401).json({ error: 401,  message: 'No autorizado'});
            }
        }

}