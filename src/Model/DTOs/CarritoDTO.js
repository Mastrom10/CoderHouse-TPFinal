import Carrito from "../models/Carrito.js";

export default class CarritoDTO {

    fromJSON(json) {
        return new Carrito(json.id, json.timestamp, json.productos);
    }

    toJSON(carrito) {
        return {
            id: carrito.id,
            timestamp: carrito.timestamp,
            productos: carrito.productos
        };
    }



}
