import ProductoAPI from '../api/ProductoAPI.js';


class ControladorProducto {

    constructor () {
        this.productoAPI = new ProductoAPI();
    }

    getProductoByIdOrAll = async (req, res) => {
        let id = req.params.id;
        if (id) {
            let producto = await this.productoAPI.getProductoById(id)
            if (producto) {
                res.json(producto);
            } else {
                res.status(404).json({ "error": "Producto no encontrado" });
            }
        } else {
            let productos = await this.productoAPI.getProductos()
            if (productos) {
                res.json(productos);
            } else {
                res.status(404).json({ "error": "No existen productos para mostrar" });
            }
        }
    
    }

    getProductosByCategoria = async (req, res) => {
        let categoria = req.params.categoria;
        if (categoria) {
            let productos = await this.productoAPI.getProductosByCategoria(categoria)
            if (productos) {
                res.json(productos);
            } else {
                res.status(404).json({ "error": "No existen productos para mostrar" });
            }
        } else {
            res.status(404).json({ "error": "No existen productos para mostrar" });
        }
    }
    

    saveProducto = async (req, res) => {
        try {
            let productoEnJson = req.body;
            let ProductoGuardado = await this.productoAPI.saveProducto(productoEnJson);
            res.json(ProductoGuardado);
        } catch (error) {
            res.status(400).json({ "error": error.message });
        }
    }

    updateProducto = async (req, res) => {
        try {
            let productoEnJson = req.body;
            let ProductoActualizado = await this.productoAPI.updateProducto(productoEnJson);
            res.json(ProductoActualizado);
        } catch (error) {
            res.status(400).json({ "error": error.message });
        }
    }

    deleteProducto = async (req, res) => {
        try {
            let id = req.params.id;
            let ProductoEliminado = await this.productoAPI.deleteProducto(id);
            res.json(ProductoEliminado);
        } catch (error) {
            res.status(400).json({ "error": error.message });
        }
    }
}

export default ControladorProducto;