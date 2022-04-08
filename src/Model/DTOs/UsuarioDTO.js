import Usuario from '../models/Usuario.js';

export default class UsuarioDTO {

    static fromJSON(json) {
        return new Usuario(json.nombre, json.apellido, json.email, json.telefono, json.hashPassword, json.id);

    }

    static toJSON(usuario) {
        return {
            id: parseInt(usuario.id),
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            telefono: usuario.telefono,
            hashPassword: usuario.hashPassword
        };
    }
    static toJSONsinPassword(usuario) {
        return {
            id: parseInt(usuario.id),
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            telefono: usuario.telefono
        };
    }

}
