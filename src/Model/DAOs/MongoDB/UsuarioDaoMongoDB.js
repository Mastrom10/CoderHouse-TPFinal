import UsuarioDTO from '../../DTOs/UsuarioDTO.js';
import { MongoClient } from 'mongodb'
import config from '../../../../config.js'

export default class UsuarioDaoMongoDB {

  constructor() {
    this.MongoDB = config.DB_MongoDB;
    this.client = new MongoClient(this.MongoDB.uri, { useNewUrlParser: true });
    this.client.connect(() => {
      this.Usuario_Collection = this.client.db(this.MongoDB.DB).collection(this.MongoDB.Usuario_Collection);
    });

  }

  async getUserByEmail(email) {
    let usuarioJSON = await this.Usuario_Collection.findOne({ email: email });
    if (usuarioJSON) {
      return UsuarioDTO.fromJSON(usuarioJSON);
    } else {
      return null;
    }

  }

  async getUserById(id) {
    let usuarioJSON = await this.Usuario_Collection.findOne({ id: parseInt(id) });
    return UsuarioDTO.fromJSON(usuarioJSON);
  }

  async saveUsuario(usuario) {
    return await this.Usuario_Collection.insertOne(UsuarioDTO.toJSON(usuario));
  }

  async getNextIdUsuario() {
    let usuarios = await this.Usuario_Collection.find().sort({ id: -1 }).limit(1).toArray();
    let id = 0;
    usuarios.forEach(usuario => {
      if (usuario.id > id) {
        id = usuario.id;
      }
    }
    );
    return id + 1;

  }
}