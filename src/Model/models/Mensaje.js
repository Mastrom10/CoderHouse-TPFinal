import Joi from 'joi';
import mensajeDTO from '../DTOs/mensajeDTO.js';

export default class Mensaje {

    constructor(from, to, mensaje, timestamp = Date.now(), id = 0) {
        this.id = id;
        this.timestamp = timestamp;
        this.from = from;
        this.to = to;
        this.mensaje = mensaje;
    }

    equals(otroMensaje) {
        if(this.id != otroMensaje.id) {
            return false;
        }
        if(this.timestamp != otroMensaje.timestamp) {
            return false;
        }
        if(this.from != otroMensaje.from) {
            return false;
        }
        if(this.to != otroMensaje.to) {
            return false;
        }
        if(this.mensaje != otroMensaje.mensaje) {
            return false;
        }
    }

    static Validar(mensajeEnJson) {
        const schema = Joi.object().keys({
            id: Joi.number().integer().min(0).required(),
            timestamp: Joi.date(),
            from: Joi.string().min(3).max(50).required(),
            to: Joi.string().min(3).max(50).required(),
            mensaje: Joi.string().min(3).max(200).required()
        });
        const { error, value } = schema.validate(mensajeEnJson);
        
        if (error) {
            return error;
        }
        return mensajeDTO.fromJson(value);
    }


    fromJSON(json) {
        return mensajeDTO.fromJSON(json);
    }

    toJSON() {
        return mensajeDTO.toJSON(this);
    }
    



}