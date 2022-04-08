import dotenv from 'dotenv';
import path from 'path';


dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env')
});

const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8080,
    HOST: process.env.HOST || 'localhost',
    //Archivo, MongoDB, Firebase
    DB_Type: process.env.DB_TYPE || 'MongoDB',
    DB_Archivo: {
        Carrito_Json_Path: './src/DBs/Archivo/carrito.json',
        Producto_Json_Path: './src/DBs/Archivo/producto.json'
    },
    DB_MongoDB: {
/*         uri : "mongodb://localhost:27017/ecommerce",
 */     uri: process.env.DB_URI || "mongodb+srv://admin:Merluza23@cluster0.vuapg.mongodb.net/TPFinalCoderHouse?retryWrites=true&w=majority",
        DB: 'TPFinalCoderHouse',
        Carrito_Collection: 'Carrito',
        Producto_Collection: 'Producto',
        Usuario_Collection: 'usuarios',
        Orden_Collection: 'Orden'
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
    },
    JWT_SECRET: 'merluza23',
    JWT_EXPIRATION: '1h',
    SESSION_CONFIG: {
        secret: 'Merluza23',
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: parseInt(process.env.SESSION_EXPIRES) || 86400000// 1 day
        },
        rolling: true,
        resave: true,
        saveUninitialized: false
    },
    MAIL_CONFIG: {
        service: 'gmail',
        auth: {
            user: process.env.ADMIN_MAIL || 'coderhouse.nmastromarino@gmail.com',
            pass: process.env.ADMIN_PASS || 'Merluza23'
        }
    }

}

export default config;