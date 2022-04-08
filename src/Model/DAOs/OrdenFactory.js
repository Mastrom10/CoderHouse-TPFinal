import OrdenDaoMongoDB from './MongoDB/OrdenDaoMongoDB.js';

//Aplicamos patrón Singleton para devolver siempre la misma instancia de la clase
let OrdenDAO;

//Aplicamos patrónFactory para devolver una instancia de la clase segun la configuracion
const getOrdenDAO = () => {
    if (!OrdenDAO) {
        OrdenDAO = new OrdenDaoMongoDB();
    }
    return OrdenDAO;
}



export default getOrdenDAO;