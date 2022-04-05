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
            router.post('/', OnlyAdminsPrivilege, this.controlador.saveCarrito);
            router.put('/:id', OnlyAdminsPrivilege, this.controlador.updateCarrito);
            router.delete('/:id', OnlyAdminsPrivilege, this.controlador.deleteCarrito);
            router.get('/:id/productos', this.controlador.getProductosByCarritoId);
            router.post('/:id/productos', OnlyAdminsPrivilege, this.controlador.addProductoToCarrito);
            router.delete('/:id/productos/:idProducto', OnlyAdminsPrivilege, this.controlador.deleteProductoFromCarrito);
            return router;
        }

}
