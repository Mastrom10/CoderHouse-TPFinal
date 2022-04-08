import Carrito from "../models/Carrito.js";
import ProductoDTO from "./ProductoDTO.js";
import UsuarioDTO from "./UsuarioDTO.js";


export default class CarritoDTO {

    static fromJSON(json) {
        let productos = [];
        if (json.productos) {
            for (let i = 0; i < json.productos.length; i++) {
                productos.push(ProductoDTO.fromJSON(json.productos[i]));
            }
        }
        let user = UsuarioDTO.fromJSON(json.user);
        return new Carrito(user, json.id, json.timestamp, productos);
    }

    static toJSON(carrito) {

        let productos = [];
        if (carrito.productos) {
            for (let i = 0; i < carrito.productos.length; i++) {
                productos.push(ProductoDTO.toJSON(carrito.productos[i]));
            }
        }
        let user = UsuarioDTO.toJSON(carrito.user);

        return {
            user: user,
            id: parseInt(carrito.id),
            timestamp: carrito.timestamp,
            productos: productos
        };

    }



}
