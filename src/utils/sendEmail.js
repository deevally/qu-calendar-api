import  nodemailer from 'nodemailer';
import {SMTP_HOST, SMTP_PORT, SMTP_EMAIL, SMTP_PASSWORD} from "../config/config"
const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        host : SMTP_HOST,
        port : SMTP_PORT,
        auth : {
            user : SMTP_EMAIL,
            pass : SMTP_PASSWORD
        }
    });

    const message = {
        from : `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to:  options.email,
        subject : options.subject,
        text : options.message
    }

    await transporter.sendMail(message);

}

module.exports = sendEmail;