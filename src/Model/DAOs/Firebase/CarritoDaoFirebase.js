// import firebase
import { initializeApp} from 'firebase/app';
import { collection, doc, setDoc, updateDoc, deleteDoc, getDocsFromServer, getDocFromServer, getFirestore} from "firebase/firestore";
import config from '../../../../config.js'
import CarritoDTO from "../../DTOs/CarritoDTO.js";


export default class CarritoDaoFirebase {

    constructor() {
    this.app = initializeApp(config.DB_Firebase.ServiceAccount);
    this.db = getFirestore();
    }

// Guardar un carrito en el archivo JSON
saveCarrito = (carrito) => {
    return setDoc(doc( this.db , "carritos", `${carrito.id}`), {
        id: carrito.id,
        timestamp: carrito.timestamp,
        productos: carrito.productos
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}



// Obtener todos los carritos del archivo JSON
getCarritos = async () => {
    const carritosFirestone = await getDocsFromServer(collection( this.db , "carritos"));
    const carritos = [];
    carritosFirestone.forEach(carrito => {
        carritos.push(CarritoDTO.fromJSON(carrito.data()));
    });
    return carritos;
}

// Obtener un Carrito por ID del JSON
getCarritoById = async (id) => {
    const carritoFirestone = await getDocFromServer(doc( this.db , "carritos", `${id}`));
    const carrito =  CarritoDTO.fromJSON(carritoFirestone.data());
    return carrito;
}


//Obtener ID maximo de los carritos
getNextIdCarrito = async () => {

    const carritosFirestone = await getDocsFromServer(collection( this.db , "carritos"));
    if (carritosFirestone.length === 0) {
        return 1;
    }
    let maxId = 0;

    carritosFirestone.forEach(carrito => {
        if (carrito.data().id > maxId) {
            maxId = carrito.data().id;
        }
    });
    return maxId + 1;  
}

//Actualizar Carrito
updateCarrito = (carrito) => {
    return updateDoc(doc( this.db , "carritos", `${carrito.id}`), {
        id: carrito.id,
        timestamp: carrito.timestamp,
        productos: carrito.productos
    })
    .then(function (docRef) {
        console.log("Document written with ID: ", docRef);
    })
    .catch(function (error) {
        console.error("Error adding document: ", error);
    });
}

//Eliminar un producto del JSON
deleteCarrito = (id) => {
    return deleteDoc(doc( this.db , "carritos", `${id}`))
    .then(function (docRef) {
        console.log("Document written with ID: ", docRef);
    })
    .catch(function (error) {
        console.error("Error adding document: ", error);
    });
}

}