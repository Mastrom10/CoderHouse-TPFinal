import UsuarioDaoMongoDB from './MongoDB/UsuarioDaoMongoDB.js';


//Aplicamos patrón Singleton para devolver siempre la misma instancia de la clase
let UsuarioDAO;

//Aplicamos patrónFactory para devolver una instancia de la clase segun la configuracion
const getUsuarioDAO = () => {
    if (!UsuarioDAO) {
        UsuarioDAO = new UsuarioDaoMongoDB();
    }
    return UsuarioDAO;
}



export default getUsuarioDAO;