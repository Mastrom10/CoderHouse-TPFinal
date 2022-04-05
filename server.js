/* Dependencias Externas*/
import express from 'express';
import session from 'express-session';


/* Dependencias Internas */
import routerCarrito from './src/routers/routerCarrito.js';
import routerProductos from './src/routers/routerProductos.js';
import { errorHandler, notFoundHandler } from './src/Middlewares/ErrorHandling.js';
import passport from './src/Middlewares/PassportSetUp.js';
import routerAuth from './src/routers/routerAuth.js';
import routerViews from './src/routers/routerViews.js';
import config from './config.js';

//servidor express
const app = express();


/* Middlewares */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('src/public'))
app.use(session(config.SESSION_CONFIG))

app.use(passport.initialize());
app.use(passport.session());

/* view engine setup */
app.set('views', './src/views');
app.set('view engine', 'pug');
app.set('view engine', 'ejs');




/* Routers */
app.use('/api/carrito', new routerCarrito().getRouter())
app.use('/api/productos', new routerProductos().getRouter())
app.use('/api/auth', new routerAuth().getRouter())
app.use('/', new routerViews().getRouter()) //Para las vistas


/* Error Handling */
app.use('/*', notFoundHandler);
app.use(errorHandler)


/* Iniciamos el Servidor */
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
   console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

