import CarritoAPI from '../api/CarritoAPI.js';

export default class ControladorCarrito {

    constructor() {
        this.carritoAPI = new CarritoAPI();
    }

    getCarritoByIdOrAll = async (req, res) => {
        let id = req.params.id;
        if (id) {
            let carrito = await this.carritoAPI.getCarritoById(id)
            if (carrito) {
                res.json(carrito);
            } else {
                res.status(404).json({ "error": "Carrito no encontrado" });
            }
        } else {
            let carritos = await this.carritoAPI.getCarritos()
            if (carritos) {
                res.json(carritos);
            } else {
                res.status(404).json({ "error": "No existen carritos para mostrar" });
            }
        }

    }

    saveCarrito = async (req, res) => {
        try {
            let carritoEnJson = req.body;
            let CarritoGuardado = await this.carritoAPI.saveCarrito(carritoEnJson);
            res.json(CarritoGuardado);
        } catch (error) {
            res.status(400).json({ "error": error.message });
        }
    }

    updateCarrito = async (req, res) => {
        try {
            let carritoEnJson = req.body;
            let CarritoActualizado = await this.carritoAPI.updateCarrito(carritoEnJson);
            res.json(CarritoActualizado);
        } catch (error) {
            res.status(400).json({ "error": error.message });
        }
    }

    deleteCarrito = async (req, res) => {
        try {
            let id = req.params.id;
            let CarritoEliminado = await this.carritoAPI.deleteCarrito(id);
            res.json(CarritoEliminado);
        } catch (error) {
            res.status(400).json({ "error": error.message });
        }
    }
    
    getProductosByCarritoId = async (req, res) => {
        let idCarrito = req.params.id;
        let productos = await this.carritoAPI.getProductosByCarritoId(idCarrito)
        if (carrito) {
            res.json(productos);
        } else {
            res.status(404).json({ "error": "Carrito no encontrado" });
        }

    }

    addProductoToCarrito = async (req, res) => {
        try {
            let idCarrito = req.params.id;
            let producto =req.body;
            let CarritoActualizado = await this.carritoAPI.addProductoToCarrito(idCarrito, producto);
            res.json(CarritoActualizado);
        } catch (error) {
            res.status(400).json({ "error": error.message });
        }
    }

    deleteProductoFromCarrito = async (req, res) => {
        try {
            let idCarrito = req.params.id;
            let idProducto = req.params.idProducto;
            let CarritoActualizado = await this.carritoAPI.deleteProductoFromCarrito(idCarrito, idProducto);
            res.json(CarritoActualizado);
        } catch (error) {
            res.status(400).json({ "error": error.message });
        }
    }

    
}


    