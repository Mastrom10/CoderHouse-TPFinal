import { MongoClient } from 'mongodb'
import config from '../../../../config.js'
import MensajeDTO from "../../DTOs/MensajeDTO.js";


export default class MensajeDaoMongoDB {

    constructor() {
        this.MongoDB = config.DB_MongoDB;
        this.client = new MongoClient(this.MongoDB.uri, { useNewUrlParser: true });
        this.client.connect(() => {
            this.Mensaje_Collection = this.client.db(this.MongoDB.DB).collection(this.MongoDB.Mensaje_Collection);
        } );
    }

    // Guardar un Mensaje en el archivo JSON
    saveMensaje = (Mensaje) => {
        return this.Mensaje_Collection.insertOne(Mensaje);
    }

    // Obtener todos los Mensajes del archivo JSON
    getMensajees = async () => {
        
        let MensajesJSON = await this.Mensaje_Collection.find().toArray();
        let Mensajes = [];
        if (MensajesJSON.length > 0) {
            MensajesJSON.forEach(Mensaje => {
                Mensajes.push(MensajeDTO.fromJSON(Mensaje));
            });
        } else {
            return null;
        }
        return Mensajes;
    }

    // Obtener un Mensaje por ID del JSON
    getMensajeById = async (id) => {
        try {
            let MensajeJSON = await this.Mensaje_Collection.findOne({ id: parseInt(id) });
            let Mensaje = MensajeDTO.fromJSON(MensajeJSON);
            return Mensaje;
        } catch (error) {
            console.log(error);
        }
    }


    //Obtener ID maximo de los Mensajes
    getNextIdMensaje = async () => {

        let Mensaje = await this.Mensaje_Collection.findOne({}, { sort: { id: -1 } });
        if (Mensaje) {
            return Mensaje.id + 1;
        } else {
            return 1;
        }
    }
    //Actualizar Mensaje
    updateMensaje = (Mensaje) => {
        return this.Mensaje_Collection.updateOne({ id: Mensaje.id }, { $set: MensajeDTO.toJSON(Mensaje) });

    }

    //Eliminar un producto del JSON
    deleteMensaje = (id) => {
        return this.Mensaje_Collection.deleteOne({ id: parseInt(id) });

    }

    getMensajesByEmail = async (email) => {
        try {
            //[{ from: email }, { to: email }]
            let MensajesJSON = await this.Mensaje_Collection.find({ $or: [{ from: email }, { to: email }] }).toArray();
            let MensajesOBJ = [];
            if (MensajesJSON.length > 0) {
                MensajesJSON.forEach(Mensaje => {
                    MensajesOBJ.push(MensajeDTO.fromJSON(Mensaje));
                });
            } else {
                return null;
            }
            return MensajesOBJ;
        } catch (error) {
            console.log(error);
        }
    }   



}