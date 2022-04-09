import Mensaje from "../models/Mensaje";

export default class MensajeDTO {

    static fromJSON(json) {
        return new Mensaje(json.from, json.to, json.mensaje, json.timestamp, json.id);
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
