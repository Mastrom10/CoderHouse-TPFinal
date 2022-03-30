

export const config = {
    //Archivo, MongoDB, Firebase
    DB_Type: 'Firebase',
    DB_Archivo: {
        Carrito_Json_Path: './src/DBs/Archivo/carrito.json',
        Producto_Json_Path: './src/DBs/Archivo/producto.json'
    },
    DB_MongoDB: {
/*         uri : "mongodb://localhost:27017/ecommerce",
 */     uri: "mongodb+srv://admin:Merluza23@cluster0.vuapg.mongodb.net/TPFinalCoderHouse?retryWrites=true&w=majority",
        DB: 'TPFinalCoderHouse',
        Carrito_Collection: 'Carrito',
        Producto_Collection: 'Producto'
    },
    DB_Firebase: {
        databaseURL: "https://ecommerce-6dfbf.firebaseio.com",
        ServiceAccount: {
            apiKey: "AIzaSyAt1immzUNiNdFGK6R4c3KScVsT5CE7vkc",
            authDomain: "ecommerce-6dfbf.firebaseapp.com",
            projectId: "ecommerce-6dfbf",
            storageBucket: "ecommerce-6dfbf.appspot.com",
            messagingSenderId: "411814913968",
            appId: "1:411814913968:web:a3c282fe4491b6ec3b9875"

        }
    }
}
