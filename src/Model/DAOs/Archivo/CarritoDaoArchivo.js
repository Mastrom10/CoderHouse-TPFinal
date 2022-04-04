import CarritoDTO from "../../DTOs/CarritoDTO.js";
import fs from 'fs';

export default class CarritoDaoArchivo {

    constructor() { 
        this.CarritoDTO = new CarritoDTO();
    }

    // Guardar un carrito en el archivo JSON
    saveCarrito = (carrito) => {
        let carritos = this.getCarritos();
        carritos = this.QuitarCarrito(carritos, carrito.id);
        carritos.push(carrito);
        fs.writeFileSync('./src/DBs/Archivo/carrito.json', JSON.stringify(carritos));
        return carrito;
    }

    // Obtener todos los carritos del archivo JSON
    getCarritos = () => {
        let carritosJson = JSON.parse(fs.readFileSync('./src/DBs/Archivo/carrito.json').toString());
        let carritos = [];
        carritosJson.forEach(carrito => {
            carritos.push(this.CarritoDTO.fromJSON(carrito));
        });
        return carritos;
    }

    // Obtener un Carrito por ID del JSON
    getCarritoById = (id) => {
        let carritos = this.getCarritos();
        let carrito = carritos.find(carrito => carrito.id == id);
        if (carrito) {
            return this.CarritoDTO.fromJSON(carrito);
        } else {
            return null;
        }
    }

    //Obtener ID maximo de los carritos
    getNextIdCarrito = () => {
        try {
            let carritos = this.getCarritos();
            let maxId = 0;
            carritos.forEach(carrito => {
                if (carrito.id > maxId) {
                    maxId = carrito.id;
                }
            });
            return maxId + 1;
        } catch (error) {
            return 1;
        }

    }

    //Actualizar Carrito
    updateCarrito = (carrito) => {
        let carritos = this.getCarritos();
        let index = carritos.findIndex(x => x.id == carrito.id);
        if (index != -1) {
            carritos[index] = carrito;
            fs.writeFileSync('./src/DBs/Archivo/carrito.json', JSON.stringify(carritos));
            return true;
        } else {
            return false;
        }

    }

    //Eliminar un producto del JSON
    deleteCarrito = (id) => {
        let carritos = this.getCarritos();
        let index = carritos.findIndex(x => x.id == id);
        if (index != -1) {
            carritos.splice(index, 1);
            fs.writeFileSync('./src/DBs/Archivo/carrito.json', JSON.stringify(carritos));
            return true
        } else {
            return false
        }
    }

    QuitarCarrito = (carritos, id) => {
        let index = carritos.findIndex(x => x.id == id);
        if (index != -1) {
            carritos.splice(index, 1);
            return carritos
        } else {
            return carritos
        }
    }

}