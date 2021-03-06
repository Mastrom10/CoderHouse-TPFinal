import Joi from 'joi';
import bCrypt from 'bcrypt';
import UsuarioDTO from '../DTOs/UsuarioDTO.js';

export default class Usuario {

    constructor(nombre, apellido, email, telefono, hashPassword, id = 0) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.hashPassword = hashPassword;
    }

    equals(otroUsuario) {
        if (this.id != otroUsuario.id) {
            return false;
        }
        if (this.nombre != otroUsuario.nombre) {
            return false;
        }
        if (this.apellido != otroUsuario.apellido) {
            return false;
        }
        if (this.email != otroUsuario.email) {
            return false;
        }
        if (this.telefono != otroUsuario.telefono) {
            return false;
        }

        if (this.hashPassword != otroUsuario.hashPassword) {
            return false;
        }
        return true;
    }

    static Validar(usuarioEnJson) {
        const schema = Joi.object().keys({
            id: Joi.number().integer().min(0).required(),
            nombre: Joi.string().min(3).max(50).required(),
            apellido: Joi.string().min(3).max(50).required(),
            email: Joi.string().min(3).max(50).required(),
            telefono: Joi.string().min(3).max(50).required(),
            hashPassword: Joi.string().min(3).max(150)
        });
        const { error, value } = schema.validate(usuarioEnJson);

        if (error) {
            console.log(error);
            throw error;
        }
        return value;
    }

    fromJSON(json) {
       return UsuarioDTO.fromJSON(json);
    }

    isValidPassword(password) {
        return bCrypt.compareSync(password, this.hashPassword);
    }

    static createHash(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }


}