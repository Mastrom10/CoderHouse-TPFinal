import express from 'express'
import {checkAuthentication} from '../Middlewares/Autorizacion.js'
import config from '../../config.js'

const ServerInfo = {
    CWD: process.cwd(),
    PID: process.pid,
    PPID: process.ppid,
    VERSION: process.version,
    NOMBRE: process.title,
    PLATAFORMA: process.platform,
    MEMORY: process.memoryUsage(),
    UPTIME: process.uptime(),
    EXEC_PATH: process.execPath,
    EXEC_ARGS: process.execArgv,
    ARGV: process.argv,
    CONFIG: config
}


const router = express.Router();

class routerViews {

    constructor() {
    }

    getRouter() {
        router.get('/serverInfo', (req, res) => {
            res.render('serverInfo.pug', {ServerInfo})
        });
        return router;
    }

}

export default routerViews;