import getUsuarioDAO from '../Model/DAOs/UsuarioFactory.js';
import Usuario from '../Model/models/Usuario.js';
import Mailer from '../Middlewares/Mailer.js';


export default class UsuarioAPI {

    constructor() {
        this.dao = getUsuarioDAO();
    }

    getUserByEmail(email) {
        return this.dao.getUserByEmail(email);
    }

    getUserById(id) {
        return this.dao.getUserById(id);
    }

    async createUser(usuario) {
        if (!usuario.id) {
            usuario.id = await this.dao.getNextIdUsuario();
        }
        if (!usuario.hashPassword) {
            usuario.hashPassword = Usuario.createHash(usuario.password);
        }
        const usuarioOBJ = Usuario.fromJSON(usuario);
        let resultado = await this.dao.saveUsuario(usuarioOBJ);
        //enviar un mail si el resultado fue exitoso.
        if (resultado) {
            const mailer = new Mailer();
            const subject = "Bienvenido a la Plataforma de Ecommerce de Nmastromarino";
            const text = "Gracias por registrarte en la Plataforma de Ecommerce de Nmastromarino, tu cuenta ha sido creada exitosamente. Por las dudas, te dejo los datos de tu cuenta: \n\n" +
                "Email: " + usuario.email + "\n" +
                "Contraseña: " + usuario.password + "\n\n" +
                "Por favor, no olvides cambiar tu contraseña una vez ingreses a la plataforma. (Spoiler, no se puede)";
            await mailer.sendMail(usuario.email, subject, text);
        }

        return usuarioOBJ;
    }


    
    
}