# CoderHouse-TPFinal
eCommerce Backend correspondiente a la última entrega de tu proyecto final.


## Backend

El Backend fue deployado en Heroku.

https://nmastromarino-tpfinal-coder.herokuapp.com/



### Persistencia.
Los 3 tipos de persistencia están implementados y funcionando: MongoAtlas, Firebase y Archivo local JSON.
Se pueden elegir entre ellos modificando "Config.js"


### Login
Se implementa PassPOrt Local y Passport JWT

Rutas: /api/auth/login para hacer login. /api/auth/signup para registrarse. 
Ambas rutas, devuelve un JWT que será utilizado para autenticar las siguientes request.

El password en ningun momento se guarda, se ofusca mediante la libreria bcrypt, antes de almacenarse en la base de datos.

Se devuelve codigo 406 (no acceptable) en caso de que durante el registro, el mail ya exista.


### Envio de Mails

se envian a traves de GMAIL
se creó una cuenta en GMAIL para poder enviar mails.
coderhouse.nmastromarino@gmail.com

Luego de registrar un usuario, se le envia un mail con los datos de su cuenta.


### Chat via WebSockets. 

Podemos acceder al chat en /chat

para poder chatear, debemos estár logueados con una session activa, por lo que primero debemos hacer login via JWT (en la misma pagina), o en /login.

### Ambiente

El servidor esta configurado para ejecutarse en ambiente de Produccion y desarrollo.
definiendo la variable de entorno "NODE_ENV" ("development" | "production") podemos tomar las diferentes configuraciones de los archivos .env
tambien podemos lanzar el servidor en modo de desarrollo con "npm run dev" o en modo de produccion con "npm run prod"
"npm start" no define el ambiente, por lo que se toma el ambiente definido en el sistema, o en su defecto en "development".

### Ver configuraciones del servidor
en la ruta "/serverInfo" se puede ver la configuracion del servidor. es una vista generada con PUG.




