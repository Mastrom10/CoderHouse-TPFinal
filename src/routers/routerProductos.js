import express from 'express'
import ControladorProducto from '../controlador/ControladorProducto.js'
import {checkAuthentication} from '../Middlewares/Autorizacion.js'


const router = express.Router();

class RouterProductos {

    constructor() {
        this.controlador = new ControladorProducto()
    }

    getRouter() {
        router.get('/:id?', this.controlador.getProductoByIdOrAll);
        router.post('/', this.controlador.saveProducto);
        router.put('/:id', this.controlador.updateProducto);
        router.delete('/:id', this.controlador.deleteProducto);
        router.get('/categoria/:categoria', this.controlador.getProductosByCategoria);
        return router;
    }

}

export default RouterProductos;