import OrdenAPI from '../api/OrdenAPI.js';

export default class ControladorOrden {

    constructor() {
        this.ordenAPI = new OrdenAPI();
    }

    getOrdenByIdOrAll = async (req, res) => {
        let id = req.params.id;
        if (id) {
            let orden = await this.ordenAPI.getOrdenById(id)
            if (orden) {
                res.json(orden);
            } else {
                res.status(404).json({ "error": "Orden no encontrada" });
            }
        } else {
            let ordenes = await this.ordenAPI.getOrdenes()
            if (ordenes) {
                res.json(ordenes);
            } else {
                res.status(404).json({ "error": "No existen ordenes para mostrar" });
            }
        }

    }

    saveOrden = async (req, res) => {
        try {
            let carrito = req.body.carrito;
            let usuario = req.user;
            let OrdenGuardado = await this.ordenAPI.saveOrdCategoríaen(usuario, carrito);
            res.json(OrdenGuardado);
        } catch (error) {
            res.status(400).json({ "error": error.message });
        }
    }

    updateOrden = async (req, res) => {
        try {
            let ordenEnJson = req.body;
            let OrdenActualizado = await this.ordenAPI.updateOrden(ordenEnJson);
            res.json(OrdenActualizado);
        } catch (error) {
            res.status(400).json({ "error": error.message });
        }
    }

    deleteOrden = async (req, res) => {
        try {
            let id = req.params.id;
            let OrdenEliminado = await this.ordenAPI.deleteOrden(id);
            res.json(OrdenEliminado);
        } catch (error) {
            res.status(400).json({ "error": error.message });
        }
    }

}
