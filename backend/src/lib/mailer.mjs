import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail',
    port:465,
    secure:true,
    auth:{
        user:process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
    family:4,
});


export async function sendEmail(dest, asunto, text){
    await transporter.sendMail({
        from: `"Fintrack" <${process.env.MAIL_USER}>`,
        to: dest,
        subject: asunto,
        html: text
    });
}