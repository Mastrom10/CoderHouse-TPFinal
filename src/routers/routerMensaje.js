import express from 'express'
import ControladorMensaje from '../controlador/ControladorMensaje.js'

const router = express.Router()

export default class RouterMensaje {

    constructor() {
        this.controlador = new ControladorMensaje();
    }

    getRouter() {
        router.get('/:email', this.controlador.getMensajesByEmail);
        router.get('/:id?', this.controlador.getMensajeByIdOrAll);
        
        return router;
    }

}
