import Orden from '../models/Orden.js';
import CarritoDTO from '../DTOs/CarritoDTO.js';
import UsuarioDTO from '../DTOs/UsuarioDTO.js';

export default class OrdenDTO {

    static fromJSON(json) {
        return new Orden(
            CarritoDTO.fromJSON(json.carrito),
            UsuarioDTO.fromJSON(json.usuario),
            json.estado,
            json.id,
            json.timestamp
        );
    }

    static toJSON(orden) {
        return {
            carrito: CarritoDTO.toJSON(orden.carrito),
            usuario: UsuarioDTO.toJSON(orden.usuario),
            estado: orden.estado,
            id: parseInt(orden.id),
            timestamp: orden.timestamp
        };
    }


}