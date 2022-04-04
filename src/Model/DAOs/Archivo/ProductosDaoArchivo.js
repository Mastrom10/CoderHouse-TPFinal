
import ProductoDTO from "../../DTOs/ProductoDTO.js";
import fs from "fs";


export default class ProductosDaoArchivo {

  constructor() {
    this.ProductoDTO = new ProductoDTO();
  }

  // Guardar un producto en el archivo JSON
  saveProducto(producto) {
    let productos = this.getProductos();
    productos.push(producto);
    fs.writeFileSync("./src/DBs/Archivo/productos.json", this.ProductoDTO.toJSON(productos));
  }

  // Obtener todos los productos del archivo JSON
  getProductos() {
    let productosJSON = JSON.parse(fs.readFileSync("./src/DBs/Archivo/productos.json"));
    let productos = [];
    productosJSON.forEach(producto => {
      producto.push(this.ProductoDTO.fromJSON(producto)); });
    return productos;
  }

  // Obtener un producto por Id
  getProductoById(id) {
    let productos = this.getProductos();
    let producto = productos.find(p => p.id == id);
    if (producto) {
      return this.ProductoDTO.fromJSON(producto);
     } else {
      return null;
    }

  }

  //Obtener ID maximo de los Productos
  getNextIdProducto() {
    let productos = this.getProductos();
    let maxId = 0;
    productos.forEach(producto => {
      if (producto.id > maxId) {
        maxId = producto.id;
      }
    });
    return maxId + 1;
  }

  // Obtener un producto por Codigo
  getProductosByCodigo(codigo) {
    let productos = this.getProductos();
    let productosFiltrados = productos.filter(p => p.codigo == codigo);
    return productosFiltrados;
  }

  // Actualizar un producto del JSON
  updateProducto(producto) {
    let productos = this.getProductos();
    let index = productos.findIndex(p => p.id == producto.id);
    productos[index] = producto;
    fs.writeFileSync("./src/DBs/Archivo/productos.json", this.ProductoDTO.toJSON(productos));
  }

  // Eliminar un producto del JSON por Id
  deleteProducto(id) {
    let productos = this.getProductos();
    let index = productos.findIndex(p => p.id == id);
    productos.splice(index, 1);
    fs.writeFileSync("./src/DBs/Archivo/productos.json", this.ProductoDTO.toJSON(productos));
  }

}


