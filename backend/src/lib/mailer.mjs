import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(dest, asunto, text) {
    const { data, error } = await resend.emails.send({
        from: 'Fintrack <onboarding@resend.dev>', // dominio de prueba, gratis, sin configuración extra
        to: dest,
        subject: asunto,
        html: text,
    });

    if (error) {
        console.error('Error al enviar correo con Resend:', error);
        throw new Error('No se pudo enviar el correo');
    }

    return data;
}