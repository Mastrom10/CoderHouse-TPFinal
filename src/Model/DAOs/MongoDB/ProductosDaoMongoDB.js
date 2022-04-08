import ProductoDTO from "../../DTOs/ProductoDTO.js";
import { MongoClient } from 'mongodb'
import config from '../../../../config.js'

export default class ProductosDaoMongoDB {

  constructor() {
    this.MongoDB = config.DB_MongoDB;
    this.client = new MongoClient(this.MongoDB.uri, { useNewUrlParser: true });
    this.client.connect(() => {
      this.Producto_Collection = this.client.db(this.MongoDB.DB).collection(this.MongoDB.Producto_Collection);
    });

  }

  saveProducto(producto) {
    return this.Producto_Collection.insertOne(ProductoDTO.toJSON(producto));
  }

  async getProductos() {
    try {
      let productosJSON = await this.Producto_Collection.find().toArray();
      let productos = [];
      productosJSON.forEach(producto => {
        productos.push(ProductoDTO.fromJSON(producto));
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
    try {
      let productoJSON = await this.Producto_Collection.findOne({ id: parseInt(id) });
      if (productoJSON) {
        return ProductoDTO.fromJSON(productoJSON);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  //Obtener Productos por Categoria
  async getProductosByCategoria(categoria) {
    try {
      let productosJSON = await this.Producto_Collection.find({ categoria: categoria }).toArray();
      let productos = [];
      productosJSON.forEach(producto => {
        productos.push(ProductoDTO.fromJSON(producto));
      })
      return productos;
    } catch (error) {
      console.log(error);
      throw error;
    }
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
    return id + 1;

  }

  // Actualizar un producto del JSON
  async updateProducto(producto) {
    return await this.Producto_Collection.updateOne({ id: parseInt(producto.id) }, { $set: ProductoDTO.toJSON(producto) });
  }

  // Eliminar un producto del JSON por Id
  async deleteProducto(id) {
    return await this.Producto_Collection.deleteOne({ id: parseInt(id) });

  }



}