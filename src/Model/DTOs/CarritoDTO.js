import Carrito from "../models/Carrito.js";
import Producto from "../models/Producto.js";
import ProductoDTO from "./ProductoDTO.js";

export default class CarritoDTO {

    static fromJSON(json) {
        let productos = [];
        if (json.productos) {
            for (let i = 0; i < json.productos.length; i++) {
                productos.push(ProductoDTO.fromJSON(json.productos[i]));
            }
        }

        return new Carrito(json.id, json.timestamp, productos);
    }

    static toJSON(carrito) {

        let productos = [];
        for (let i = 0; i < carrito.productos.length; i++) {
            productos.push(ProductoDTO.toJSON(carrito.productos[i]));
        }

        return {
            id: parseInt(carrito.id),
            timestamp: carrito.timestamp,
            productos: productos
        };

    }



}
