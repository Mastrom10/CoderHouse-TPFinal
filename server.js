/* Dependencias Externas*/
import express from 'express';
import session from 'express-session';
import {Server as IOServer} from 'socket.io';
import http from 'http';

/* Dependencias Internas */
import routerCarrito from './src/routers/routerCarrito.js';
import routerProductos from './src/routers/routerProductos.js';
import { errorHandler, notFoundHandler } from './src/Middlewares/ErrorHandling.js';
import { checkAuthentication } from './src/Middlewares/Autorizacion.js';
import passport from './src/Middlewares/PassportSetUp.js';
import routerAuth from './src/routers/routerAuth.js';
import routerViews from './src/routers/routerViews.js';
import RouterOrden from './src/routers/routerOrden.js';
import RouterMensaje from './src/routers/routerMensaje.js';
import config from './config.js';

import WebsocketChatHandler from './src/Middlewares/WebsocketChat.js';

//servidor express
const app = express();
const httpServer = http.createServer(app);

/* Configuracion de Chat */
const io = new IOServer(httpServer);
io.on('connection', WebsocketChatHandler);


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
app.use('/api/carrito', checkAuthentication, new routerCarrito().getRouter())
app.use('/api/productos', checkAuthentication, new routerProductos().getRouter())
app.use('/api/auth', new routerAuth().getRouter())
app.use('/api/orden', checkAuthentication, new RouterOrden().getRouter())
app.use('/api/chat', checkAuthentication, new RouterMensaje().getRouter())
app.use('/', new routerViews().getRouter()) //Para las vistas


/* Error Handling */
app.use('/*', notFoundHandler);
app.use(errorHandler)


/* Iniciamos el Servidor */
const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT, () => {
   console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

