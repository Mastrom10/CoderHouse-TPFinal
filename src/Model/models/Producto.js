import Joi from 'joi';
import ProductoDTO from '../DTOs/ProductoDTO.js';


export default class Producto {

    constructor(nombre, descripcion, codigo, foto, precio, categoria, stock = 0, id = 0, timestamp = Date.now()) {
        this.id = id;
        this.timestamp = timestamp;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
    }

    equals(otroProducto) {
        if(this.id != otroProducto.id) {
            return false;
        }
        if(this.timestamp != otroProducto.timestamp) {
            return false;
        }
        if(this.nombre != otroProducto.nombre) {
            return false;
        }
        if(this.descripcion != otroProducto.descripcion) {
            return false;
        }
        if(this.codigo != otroProducto.codigo) {
            return false;
        }
        if(this.foto != otroProducto.foto) {
            return false;
        }
        if(this.precio != otroProducto.precio) {
            return false;
        }
        if(this.categoria != otroProducto.categoria) {
        return true;
        }
    }

    static Validar(productoEnJson) {
        const schema = Joi.object().keys({
            id: Joi.number().integer().min(0).required(),
            timestamp: Joi.date(),
            nombre: Joi.string().min(3).max(50).required(),
            descripcion: Joi.string().min(3).max(200).required(),
            codigo: Joi.string().min(3).max(50).required(),
            foto: Joi.string().min(3).max(200).required(),
            categoria: Joi.string().min(3).max(50),
            precio: Joi.number().min(0).required(),
            stock: Joi.number().integer().min(0).required()
        });
        const { error, value } = schema.validate(productoEnJson);
        
        if (error) {
            console.log(error);
            throw error;
        }
        return value;
    }

    fromJSON(json) {
        return ProductoDTO.fromJSON(json);
    }

    toJSON() {
        return ProductoDTO.toJSON(this);
    }
    

    

    
}