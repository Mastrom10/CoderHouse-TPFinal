
import ProductoDTO from "../../DTOs/ProductoDTO.js";

// import firebase
import { initializeApp } from 'firebase/app';

import { collection, doc, setDoc, updateDoc, deleteDoc, getDocsFromServer, getDocFromServer, getFirestore } from "firebase/firestore";


import config from '../../../../config.js'


export default class ProductosDaoFirebase{
  constructor() {
    this.app = initializeApp(config.DB_Firebase.ServiceAccount);
    this.db = getFirestore();
  }

  saveProducto(producto) {
    setDoc(doc(this.db, "productos", `${producto.id}`), {
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      codigo: producto.codigo,
      foto: producto.foto,
      precio: producto.precio,
      stock: producto.stock,
      timestamp: producto.timestamp,
      id: producto.id
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });


  }

  async getProductos() {

    const productosFirestone = await getDocsFromServer(collection(this.db, "productos"));
    const productos = [];
    productosFirestone.forEach(producto => {
      productos.push(ProductoDTO.fromJSON(producto.data()));
     });
    return productos;
  }


  // Obtener un producto por Id
  async getProductoById(id) {
    const productoFirestone = await getDocFromServer(doc(this.db, "productos", `${id}`));
    return ProductoDTO.fromJSON(productoFirestone.data());

  }

  //Obtener ID siguiente de los Productos
  async getNextIdProducto() {
    const productos = await this.getProductos();
    if (productos.length == 0) {
      return 1;
    }
    let id = 0;
    productos.forEach(producto => {
      if (producto.id > id) {
        id = producto.id;
      }
    });
    return id + 1;

  }

  // Actualizar un producto en firebase
  updateProducto(producto) {
    updateDoc(doc(this.db, "productos", `${producto.id}`), {
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      codigo: producto.codigo,
      foto: producto.foto,
      precio: producto.precio,
      stock: producto.stock,
      timestamp: producto.timestamp,
      id: producto.id
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      }
      );


  }

  // Eliminar un producto del JSON por Id
  deleteProducto(id) {
    deleteDoc(doc(this.db, "productos", `${id}`)).then(function () {
      console.log("Document successfully deleted!");
    }
    ).catch(function (error) {
      console.error("Error removing document: ", error);
    }
    );

  }


}


