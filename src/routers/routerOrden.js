import express from 'express'
import ControladorOrden from '../controlador/ControladorOrden.js'

const router = express.Router()

export default class RouterOrden {

    constructor() {
        this.controlador = new ControladorOrden();
    }

    getRouter() {
        router.get('/:id?', this.controlador.getOrdenByIdOrAll);
        router.post('/', this.controlador.saveOrden);
        router.put('/:id', this.controlador.updateOrden);
        router.delete('/:id', this.controlador.deleteOrden);
        return router;
    }

}
