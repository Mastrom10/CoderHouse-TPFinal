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

### Ambiente

El servidor esta configurado para ejecutarse en ambiente de Produccion y desarrollo.
definiendo la variable de entorno "NODE_ENV" ("development" | "production") podemos tomar las diferentes configuraciones de los archivos .env
tambien podemos lanzar el servidor en modo de desarrollo con "npm run dev" o en modo de produccion con "npm run prod"
"npm start" no define el ambiente, por lo que se toma el ambiente definido en el sistema, o en su defecto en "development".

### Ver configuraciones del servidor
en la ruta "/serverInfo" se puede ver la configuracion del servidor. es una vista generada con PUG.

