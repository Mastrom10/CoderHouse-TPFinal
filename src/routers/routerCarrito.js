import express from 'express'
import ControladorCarrito from '../controlador/ControladorCarrito.js'
import {OnlyAdminsPrivilege} from '../Middlewares/Autorizacion.js'

const router = express.Router()

export default class RouterCarrito {
    
        constructor() {
            this.controlador = new ControladorCarrito();
        }
    
        getRouter() {
            router.get('/:id?', this.controlador.getCarritoByIdOrAll);
            router.post('/', this.controlador.saveCarrito);
            router.put('/:id', this.controlador.updateCarrito);
            router.delete('/:id', this.controlador.deleteCarrito);
            router.get('/:id/productos', this.controlador.getProductosByCarritoId);
            router.post('/:id/productos', this.controlador.addProductoToCarrito);
            router.delete('/:id/productos/:idProducto', this.controlador.deleteProductoFromCarrito);
            return router;
        }

}
