import express from 'express'
import ControladorProducto from '../controlador/ControladorProducto.js'
import {OnlyAdminsPrivilege} from '../Middlewares/Autorizacion.js'


const router = express.Router();

class RouterProductos {

    constructor() {
        this.controlador = new ControladorProducto()
    }

    getRouter() {
        router.get('/:id?', this.controlador.getProductoByIdOrAll);
        router.post('/', OnlyAdminsPrivilege, this.controlador.saveProducto);
        router.put('/:id', OnlyAdminsPrivilege, this.controlador.updateProducto);
        router.delete('/:id', OnlyAdminsPrivilege, this.controlador.deleteProducto);
        return router;
    }

}

export default RouterProductos;