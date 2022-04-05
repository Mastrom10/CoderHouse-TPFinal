import getUsuarioDAO from '../Model/DAOs/UsuarioFactory.js';
import Usuario from '../Model/models/Usuario.js';

export default class UsuarioAPI {

    constructor() {
        this.dao = getUsuarioDAO();
    }

    getUserByEmail(email) {
        return this.dao.getUserByEmail(email);
    }

    getUserById(id) {
        return this.dao.getUserById(id);
    }

    async createUser(usuario) {
        if (!usuario.id) {
            usuario.id = await this.dao.getNextIdUsuario();
        }
        if (!usuario.hashPassword) {
            usuario.hashPassword = Usuario.createHash(usuario.password);
        }
        const usuarioOBJ = Usuario.fromJSON(usuario);
        let resultado = await this.dao.saveUsuario(usuarioOBJ);
        return usuarioOBJ;
    }


    
    
}