import Joi from 'joi';
import Producto  from './Producto.js';
import ProductoDTO from '../DTOs/ProductoDTO.js';

export default class Carrito {
//constructor estructura: id, timestamp(carrito), producto: [{ id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }]

    productos = [];

    constructor(id = 0, timestamp = Date.now(), productos = []) {
        this.id = id;
        this.timestamp = timestamp;
        this.productos = productos;
        this.ProductoDTO = new ProductoDTO();
    }
    
    equals(otroCarrito) {
        if(this.id != otroCarrito.id) {
            return false;
        }
        if(this.timestamp != otroCarrito.timestamp) {
            return false;
        }
        return true;
    }

    static Validar(carritoEnJson) {
        const schema = Joi.object().keys({
            id: Joi.number().integer().min(0).required(),
            timestamp: Joi.date(),
            productos: Joi.array().items(Producto.Validar)
        });
        const { error, value } = schema.validate(carritoEnJson);

        if (error) {
            throw error;
        }
        return value;
    }


    //agregar Producto
    agregarProducto(producto) {
        Producto.Validar(producto);
        this.productos.push( this.ProductoDTO.fromJSON(producto) );
    }

    //quitar producto
    quitarProducto(productoID) {
        //encontrar Index
        const index = this.productos.findIndex(producto => producto.id == productoID);
        this.productos.splice(index, 1);
    }

    //calcular total
    calcularTotal() {
        let total = 0;
        this.productos.forEach(producto => {
            total += producto.precio;
        });
        return total;
    }

    //calcular cantidad de productos
    calcularCantidadProductos() {
        return this.productos.length;
    }


    

}