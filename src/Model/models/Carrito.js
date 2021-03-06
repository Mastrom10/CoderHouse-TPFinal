import Joi from 'joi';
import Producto  from './Producto.js';
import ProductoDTO from '../DTOs/ProductoDTO.js';
import Usuario from './Usuario.js';

export default class Carrito {
//constructor estructura: id, timestamp(carrito), producto: [{ id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }]

    productos = [];

    constructor(user, id = 0, timestamp = Date.now(), productos = []) {
        this.id = id;
        this.timestamp = timestamp;
        this.productos = productos;
        this.user = user;
    }
    
    equals(otroCarrito) {
        if (this.user.id != otroCarrito.user.id) {
            return false;
        }

        
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
            user: Usuario.Validar,
            id: Joi.number().integer().min(0).required(),
            timestamp: Joi.date(),
            productos: Joi.array().items(Producto.Validar)
        });
        const { error, value } = schema.validate(carritoEnJson);

        if (error) {
            console.log(error);

            throw error;
        }
        return value;
    }


    //agregar Producto
    agregarProducto(producto) {
        Producto.Validar(producto);
        this.productos.push( ProductoDTO.fromJSON(producto) );
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