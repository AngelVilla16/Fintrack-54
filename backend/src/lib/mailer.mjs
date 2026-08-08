import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
});


export async function sendEmail(dest, asunto, text){
    await transporter.sendMail({
        from: `"Fintrack" <${process.env.MAIL_USER}>`,
        to: dest,
        subject: asunto,
        html: text
    });
}