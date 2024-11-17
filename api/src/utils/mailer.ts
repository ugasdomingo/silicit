//Import tools
import nodemailer from 'nodemailer';
import { internal_response } from './responses';

//Create the transporter
export const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_PORT === '465',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

//Send the email
export const send_email = async (to: string, subject: string, html: string) => {
    try {
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            html,
        });
    } catch (error: any) {
        internal_response('Error enviando el email', error);
    }
};
