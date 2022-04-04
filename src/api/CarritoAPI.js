import GetCarritoDAO from '../Model/DAOs/CarritoFactory.js';
import Carrito from '../Model/models/Carrito.js';



export default class CarritoAPI {

    constructor() {
        this.dao = GetCarritoDAO();
    }

    async getCarritoById(id) {
        return await this.dao.getCarritoById(id);
    }
    async getCarritos() {
        return await this.dao.getCarritos();
    }

    async saveCarrito(carrito) {
        //si id es null o 0
        if (carrito.id == null || carrito.id == 0) {
            carrito.id = await this.dao.getNextIdCarrito();
        }
        //generar Carrito timestamp
        if (carrito.timestamp == null) {
            carrito.timestamp = Date.now();
        }        
        this.ValidarCarrito(carrito);
        return await this.dao.saveCarrito(carrito);

    }


    async updateCarrito(carrito) {
        this.ValidarCarrito(carrito);
        return this.dao.updateCarrito(carrito);
    }


    async deleteCarrito(id) {

        return await this.dao.deleteCarrito(id);
    }

    async getProductosByCarritoId(idCarrito) {
        const carrito = await this.dao.getCarritoById(idCarrito);
        if (carrito) {
            return carrito.productos;
        } else {
            return null;
        }
    }

    async addProductoToCarrito(idCarrito, producto) {
        const carrito = await this.dao.getCarritoById(idCarrito);
        if (carrito) {
            carrito.agregarProducto(producto);
            return await this.dao.updateCarrito(carrito);
        } else {
            throw new Error('Carrito no encontrado');
        }
    }

    async deleteProductoFromCarrito(idCarrito, idProducto) {
        const carrito = await this.dao.getCarritoById(idCarrito);
        if (carrito) {
            carrito.quitarProducto(idProducto);
            return await this.dao.updateCarrito(carrito);
        } else {
            throw new Error('Carrito no encontrado');
        }
    }




    ValidarCarrito(carritoEnJson) {
        try {
            Carrito.Validar(carritoEnJson);
        } catch (error) {
            throw error;
        }

    }


}