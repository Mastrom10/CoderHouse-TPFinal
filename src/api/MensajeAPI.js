import getMensajeDAO from '../Model/DAOs/MensajesFactory.js';
import Mensaje from '../Model/models/Mensaje.js';
import MensajeDTO from '../Model/DTOs/MensajeDTO.js';

export default class MensajeAPI {

    constructor() {
        this.dao = getMensajeDAO();
    }

    async getMensajes() {
        return await this.dao.getMensajes();
    }

    async getMensajeById(id) {
        return await this.dao.getMensajeById(id);
    }

    async getMensajesByEmail(email) {
        return await this.dao.getMensajesByEmail(email);
    }


    async saveMensaje(mensajeCompleto) {
        let msg = mensajeCompleto.message;
        if (!msg.id) {
            msg.id = await this.dao.getNextIdMensaje();
        }
        if(!msg.timestamp){
            msg.timestamp = Date.now();
        }
        Mensaje.Validar(msg);
        const MensajeOBJ = MensajeDTO.fromJSON(msg);
        console.log(MensajeOBJ);
        return await this.dao.saveMensaje(MensajeOBJ);
    }

    async updateMensaje(MensajeJSON) {
        MensajeJSON.timestamp = Date.now();
        Mensaje.Validar(MensajeJSON);
        return await this.dao.updateMensaje(MensajeJSON);

    }

    async deleteMensaje(id) {
        return await this.dao.deleteMensaje(id);
    }


}
