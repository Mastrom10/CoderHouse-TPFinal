import Joi from 'joi';


export default class Producto {

    constructor(nombre, descripcion, codigo, foto, precio,stock = 0, id = 0, timestamp = Date.now()) {
        this.id = id;
        this.timestamp = timestamp;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
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
        return true;
    }

    static Validar(productoEnJson) {
        const schema = Joi.object().keys({
            id: Joi.number().integer().min(0).required(),
            timestamp: Joi.date(),
            nombre: Joi.string().min(3).max(50).required(),
            descripcion: Joi.string().min(3).max(200).required(),
            codigo: Joi.string().min(3).max(50).required(),
            foto: Joi.string().min(3).max(200).required(),
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
    

    
}