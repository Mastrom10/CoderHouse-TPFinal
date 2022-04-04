import ProductoDTO from "../../DTOs/ProductoDTO.js";
import { MongoClient } from 'mongodb'
import config from '../../../../config.js'

export default class ProductosDaoMongoDB {

  constructor() {
    this.ProductoDTO = new ProductoDTO();
    this.MongoDB = config.DB_MongoDB;
    this.client = new MongoClient(this.MongoDB.uri, { useNewUrlParser: true });
    this.client.connect(() => {
      this.Producto_Collection = this.client.db(this.MongoDB.DB).collection(this.MongoDB.Producto_Collection);
    });

  }

  saveProducto(producto) {
    return this.Producto_Collection.insertOne(this.ProductoDTO.toJSON(producto));
  }

  async getProductos() {
    try {
      let productosJSON = await this.Producto_Collection.find().toArray();
      let productos = [];
      productosJSON.forEach(producto => {
        productos.push(this.ProductoDTO.fromJSON(producto));
      }
      );

      return productos
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  // Obtener un producto por Id
  async getProductoById(id) {
    let productoJSON = await this.Producto_Collection.findOne({ id: parseInt(id) });
    return this.ProductoDTO.fromJSON(productoJSON);

  }

  //Obtener ID siguiente de los Productos
  async getNextIdProducto() {
    let productoJSON = await this.Producto_Collection.find().sort({ id: -1 }).limit(1).toArray();
    let id = 0;
    productoJSON.forEach(producto => {
      if (producto.id > id) {
        id = producto.id;
      }
    });
    return id +1 ;

  }

  // Actualizar un producto del JSON
  async updateProducto(producto) {
    return await this.Producto_Collection.updateOne({ id: parseInt(producto.id) }, { $set: this.ProductoDTO.toJSON(producto) });
  }

  // Eliminar un producto del JSON por Id
  async deleteProducto(id) {
    return await this.Producto_Collection.deleteOne({ id: parseInt(id) });

  }



}