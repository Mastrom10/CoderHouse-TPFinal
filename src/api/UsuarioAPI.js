import getUsuarioDAO from '../Model/DAOs/UsuarioFactory.js';


export default class UsuarioAPI {

    constructor() {
        this.dao = getUsuarioDAO();
    }

    async saveUsuario(usuario) {
        this.dao.saveUsuario(usuario);
    }

    async getUsuarios() {
        return await this.dao.getUsuarios();
    }

    async getUsuarioById(id) {
        return await this.dao.getUsuarioById(id);
    }

    async getNextIdUsuario() {
        return await this.dao.getNextIdUsuario();
    }   

    async getUsuariosByEmail(usuario) {
        return await this.dao.getUsuariosByEmail(usuario.email);
    }

    async updateUsuario(usuario) {
        this.dao.updateUsuario(usuario);
    }

    async deleteUsuario(id) {
        this.dao.deleteUsuario(id);
    }

    

    
}