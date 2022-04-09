import MensajeDaoMongoDB from './MongoDB/MensajeDaoMongoDB.js';

//Aplicamos patrón Singleton para devolver siempre la misma instancia de la clase
let MensajeDAO;

//Aplicamos patrónFactory para devolver una instancia de la clase segun la configuracion
const getMensajeDAO = () => {
    if (!MensajeDAO) {
        MensajeDAO = new MensajeDaoMongoDB();
    }
    return MensajeDAO;
}



export default getMensajeDAO;