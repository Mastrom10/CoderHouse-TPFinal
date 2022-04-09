import Mensaje from "../models/Mensaje.js";

export default class MensajeDTO {

    static fromJSON(json) {
        let mensaje = json.msg || json.mensaje;
        return new Mensaje(json.from, json.to, mensaje, json.timestamp, json.id);
    }

    static toJSON(mensaje) {
        return {
            from: mensaje.from,
            to: mensaje.to,
            mensaje: mensaje.mensaje,
            timestamp: mensaje.timestamp,
            id: mensaje.id
        };
    }

}
