import nodemailer from 'nodemailer';

export default class Mailer {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
               user: 'coderhouse.nmastromarino@gmail.com',
               pass: 'Merluza23'
            }
      })
        this.from = 'coderhouse.nmastromarino@gmail.com'
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
