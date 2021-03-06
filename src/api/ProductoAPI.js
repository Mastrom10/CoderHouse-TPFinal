import getProductoDAO from '../Model/DAOs/ProductoFactory.js';
import Producto from '../Model/models/Producto.js';
import ProductoDTO from '../Model/DTOs/ProductoDTO.js';

export default class ProductoAPI {

    constructor() {
        this.dao = getProductoDAO();
    }

    async getProductos() {
        return await this.dao.getProductos();
    }

    async getProductoById(id) {
        return await this.dao.getProductoById(id);
    }
    
    //by categoria
    async getProductosByCategoria(categoria) {
        return await this.dao.getProductosByCategoria(categoria);
    }


    async saveProducto(producto) {
        if (!producto.id) {
            producto.id = await this.dao.getNextIdProducto();
        }
        const productoOBJ = ProductoDTO.fromJSON(producto);
        console.log(productoOBJ);

        this.ValidarProducto(productoOBJ);
        return await this.dao.saveProducto(productoOBJ);
    }

    async updateProducto(producto) {
        producto.timestamp = Date.now();
        this.ValidarProducto(producto);
        return await this.dao.updateProducto(producto);

    }

    async deleteProducto(id) {
        return await this.dao.deleteProducto(id);
    }

    ValidarProducto(productoEnJson) {
        try {
            Producto.Validar(productoEnJson);
        } catch (error) {
            throw error;
        }

    }


}
