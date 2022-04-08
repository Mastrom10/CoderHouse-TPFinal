import Orden from '../Model/models/Orden.js';
import getOrdenDAO from '../Model/DAOs/OrdenFactory.js';
import Mailer from '../Middlewares/Mailer.js';

export default class OrdenAPI {

    constructor() {
        this.dao = getOrdenDAO();
        this.mailer = new Mailer();
    }

    async getOrdenById(id) {
        return await this.dao.getOrdenById(id);
    }
    async getOrdenes() {
        return await this.dao.getOrdenes();
    }

    async saveOrden(usuario, carrito) {
        const orden = new Orden(usuario, carrito);
        //si id es null o 0
        if (orden.id == null || orden.id == 0) {
            orden.id = await this.dao.getNextIdOrden();
        }
        //generar Orden timestamp
        if (orden.timestamp == null) {
            orden.timestamp = Date.now();
        }
        Orden.Validar(orden);

        let resultadoPromesa = await this.dao.saveOrden(orden);
        if (resultadoPromesa) {
            //sendMail(to, subject, text) 
            this.mailer.sendMail(orden.usuario.email, 'Orden #' + orden.id, orden.mensajeParaMail());
            return orden;
        } else {
            return null;
        }


    }

    async updateOrden(orden) {
        this.ValidarOrden(orden);
        return this.dao.updateOrden(orden);
    }

    async deleteOrden(id) {

        return await this.dao.deleteOrden(id);
    }


}