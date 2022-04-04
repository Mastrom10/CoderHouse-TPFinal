import { MongoClient } from 'mongodb'
import config from '../../../../config.js'
import CarritoDTO from "../../DTOs/CarritoDTO.js";


export default class CarritoDaoMongoDB {

    constructor() {
        this.MongoDB = config.DB_MongoDB;
        this.client = new MongoClient(this.MongoDB.uri, { useNewUrlParser: true });
        this.CarritoDTO = new CarritoDTO();
        this.client.connect(() => {
            this.Carrito_Collection = this.client.db(this.MongoDB.DB).collection(this.MongoDB.Carrito_Collection);
        } );
    }

    // Guardar un carrito en el archivo JSON
    saveCarrito = (carrito) => {
        return this.Carrito_Collection.insertOne(carrito);
    }

    // Obtener todos los carritos del archivo JSON
    getCarritos = async () => {
        
        let carritosJSON = await this.Carrito_Collection.find().toArray();
        let carritos = [];
        if (carritosJSON.length > 0) {
            carritosJSON.forEach(carrito => {
                carritos.push(this.CarritoDTO.fromJSON(carrito));
            });
        } else {
            return null;
        }
        return carritos;
    }

    // Obtener un Carrito por ID del JSON
    getCarritoById = async (id) => {
        try {
            let carritoJSON = await this.Carrito_Collection.findOne({ id: parseInt(id) });
            let carrito = this.CarritoDTO.fromJSON(carritoJSON);
            return carrito;
        } catch (error) {
            console.log(error);
        }
    }


    //Obtener ID maximo de los carritos
    getNextIdCarrito = async () => {

        let carrito = await this.Carrito_Collection.findOne({}, { sort: { id: -1 } });
        if (carrito) {
            return carrito.id + 1;
        } else {
            return 1;
        }
    }
    //Actualizar Carrito
    updateCarrito = (carrito) => {
        return this.Carrito_Collection.updateOne({ id: carrito.id }, { $set: { productos: carrito.productos } });

    }

    //Eliminar un producto del JSON
    deleteCarrito = (id) => {
        return this.Carrito_Collection.deleteOne({ id: parseInt(id) });

    }



}