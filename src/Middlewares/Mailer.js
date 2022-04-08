import nodemailer from 'nodemailer';
import config from '../../config.js';

export default class Mailer {

    constructor() {
        this.transporter = nodemailer.createTransport(config.MAIL_CONFIG);
        this.from = config.MAIL_CONFIG.auth.user;
    }

    async sendMail(to, subject, text) {
        const mailOptions = {
            from: this.from,
            to: to,
            subject: subject,
            text: text
        }
        return await this.transporter.sendMail(mailOptions)
    }
}
