import { MongoClient } from 'mongodb'
import config from '../../../../config.js'
import OrdenDTO from "../../DTOs/OrdenDTO.js";


export default class OrdenDaoMongoDB {

    constructor() {
        this.MongoDB = config.DB_MongoDB;
        this.client = new MongoClient(this.MongoDB.uri, { useNewUrlParser: true });
        this.client.connect(() => {
            this.Orden_Collection = this.client.db(this.MongoDB.DB).collection(this.MongoDB.Orden_Collection);
        } );
    }

    // Guardar un Orden en el archivo JSON
    saveOrden = (Orden) => {
        return this.Orden_Collection.insertOne(Orden);
    }

    // Obtener todos los Ordens del archivo JSON
    getOrdenes = async () => {
        
        let OrdensJSON = await this.Orden_Collection.find().toArray();
        let Ordens = [];
        if (OrdensJSON.length > 0) {
            OrdensJSON.forEach(Orden => {
                Ordens.push(OrdenDTO.fromJSON(Orden));
            });
        } else {
            return null;
        }
        return Ordens;
    }

    // Obtener un Orden por ID del JSON
    getOrdenById = async (id) => {
        try {
            let OrdenJSON = await this.Orden_Collection.findOne({ id: parseInt(id) });
            let Orden = OrdenDTO.fromJSON(OrdenJSON);
            return Orden;
        } catch (error) {
            console.log(error);
        }
    }


    //Obtener ID maximo de los Ordens
    getNextIdOrden = async () => {

        let Orden = await this.Orden_Collection.findOne({}, { sort: { id: -1 } });
        if (Orden) {
            return Orden.id + 1;
        } else {
            return 1;
        }
    }
    //Actualizar Orden
    updateOrden = (Orden) => {
        return this.Orden_Collection.updateOne({ id: Orden.id }, { $set: OrdenDTO.toJSON(Orden) });

    }

    //Eliminar un producto del JSON
    deleteOrden = (id) => {
        return this.Orden_Collection.deleteOne({ id: parseInt(id) });

    }



}