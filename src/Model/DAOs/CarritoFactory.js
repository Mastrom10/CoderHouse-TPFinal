
import CarritoDaoArchivo from "./Archivo/CarritoDaoArchivo.js"
import CarritoDaoMongoDB from "./MongoDB/CarritoDaoMongoDB.js"
import CarritoDaoFirebase from "./Firebase/CarritoDaoFirebase.js"
import config from "../../../config.js"

 const getCarritoDAO = () => {

 
switch (config.DB_Type) {
    case "MongoDB":
        return new CarritoDaoMongoDB();
    case "Archivo":
        return new CarritoDaoArchivo();
    case "Firebase":
        return new CarritoDaoFirebase();
    default:
        return new CarritoDaoArchivo();
}
}

export default getCarritoDAO;