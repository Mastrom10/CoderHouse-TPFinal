import Usuario from '../models/Usuario.js';

export default class UsuarioDTO {

    constructor() { }

    fromJSON(json) {
        return new Usuario(json.nombre, json.apellido, json.email, json.hashPassword, json.id);

    }

    toJSON(usuario) {
        return {
            id: parseInt(usuario.id),
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            hashPassword: usuario.hashPassword
        };
    }
    toJSONsinPassword(usuario) {
        return {
            id: parseInt(usuario.id),
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
        };
    }

}
