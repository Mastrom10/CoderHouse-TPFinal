import Producto from "../models/Producto.js";

export default class ProductoDTO {

    static fromJSON(json) {
        return new Producto(json.nombre, json.descripcion, json.codigo, json.foto, json.precio, json.stock, json.id, json.timestamp);

    }

    static toJSON(producto) {
        return {
            id: parseInt(producto.id),
            timestamp: producto.timestamp,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            codigo: producto.codigo,
            foto: producto.foto,
            precio: producto.precio,
            stock: producto.stock
        };
    }




}