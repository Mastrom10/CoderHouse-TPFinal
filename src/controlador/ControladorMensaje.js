import MensajeAPI from '../api/MensajeAPI.js'

export default class ControladorMensaje {

    constructor() {
        this.mensajeAPI = new MensajeAPI();
    }

    async getMensajesByEmail(req, res) {
        const email = req.params.email;
        const mensajeAPI = new MensajeAPI();
        let mensajes = await mensajeAPI.getMensajesByEmail(email);
        if (mensajes) {
            res.json(mensajes);
        }
        else {
            res.status(404).json({ "error": "No existen mensajes para mostrar" });
        }

    }

    async getMensajeByIdOrAll(req, res) {
        const id = req.params.id;
        if (id) {
            this.mensajeAPI.getMensajeById(id)
                .then(mensaje => {
                    res.json(mensaje);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        } else {
            this.mensajeAPI.getMensajes()
                .then(mensajes => {
                    res.json(mensajes);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        }
    }

}