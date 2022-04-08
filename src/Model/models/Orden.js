import Joi from 'joi';
import Carrito from './Carrito.js';
import Usuario from './Usuario.js';
import OrdenDTO from '../DTOs/OrdenDTO.js';

export default class Orden {

    constructor(usuario, carrito, estado = "generada", id = 0, timestamp = Date.now()) {
        this.carrito = carrito;
        this.usuario = usuario;
        this.estado = estado
        this.id = id;
        this.timestamp = timestamp;
    }

    static Validar(ordenEnJson) {
        const schema = Joi.object().keys({
            usuario: Usuario.Validar,
            carrito: Carrito.Validar,
            estado: Joi.string().valid("generada", "pagada", "cancelada"),
            id: Joi.number().integer().min(0).required(),
            timestamp: Joi.date()
        });
        const { error, value } = schema.validate(ordenEnJson);

        if (error) {
            console.log(error);
            throw error;
        }
        return value;
    }

    equals(otraOrden) {
        if(this.id != otraOrden.id) {
            return false;
        }
        if(this.timestamp != otraOrden.timestamp) {
            return false;
        }
        return true;
    }

    fromJSON(json) {
        return OrdenDTO.fromJSON(json);
    }

    toJSON() {
        return OrdenDTO.toJSON(this);
    }

    mensajeParaMail() {
        return `
            <h1>Orden ${this.id}</h1>
            <p>Estado: ${this.estado}</p>
            <p>Usuario: ${this.usuario.nombre}</p>
            <p>Carrito: ${this.carrito.id}</p>
            <p>Productos:</p>
            ${this.carrito.productos.map(p => `<p>${p.nombre}</p>`).join("")}
        `;
    }
    

}