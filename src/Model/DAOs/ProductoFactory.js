import ProductosDaoArchivo from './Archivo/ProductosDaoArchivo.js';
import ProductosDaoMongoDB from './MongoDB/ProductosDaoMongoDB.js';
import ProductosDaoFirebase from './Firebase/ProductosDaoFirebase.js';
import config from '../../../config.js';

const getProductoDAO = () => {
 switch (config.DB_Type) {
    case "MongoDB": 
        return  new ProductosDaoMongoDB();
    case "Firebase":
        return new ProductosDaoFirebase();
    case "Archivo":
        return new ProductosDaoArchivo();
    default:
        return new ProductosDaoArchivo();
}
}

export default getProductoDAO;