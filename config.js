

export const config = {
    //Archivo, MongoDB, Firebase
    DB_Type : 'Firebase',
    DB_Archivo : {
        Carrito_Json_Path: './src/DBs/Archivo/carrito.json',
        Producto_Json_Path: './src/DBs/Archivo/producto.json'
    },
    DB_MongoDB : {
/*         uri : "mongodb://localhost:27017/ecommerce",
 */     uri : "mongodb+srv://admin:Merluza23@cluster0.vuapg.mongodb.net/TPFinalCoderHouse?retryWrites=true&w=majority",   
        DB : 'TPFinalCoderHouse',
        Carrito_Collection: 'Carrito',
        Producto_Collection: 'Producto'
    },
    DB_Firebase : {
        databaseURL: "https://ecommerce-6dfbf.firebaseio.com"
    }
}
