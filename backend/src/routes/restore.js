import crypto from 'crypto';
import express from 'express';
import pool from '../lib/conexion.mjs';
import { sendEmail } from '../lib/mailer.mjs';
const router = express.Router();

router.post('/reset', async (req, res)=>{
    const {correo} = req.body;

    const query = "SELECT id_usuario, nombre, correo FROM usuarios WHERE correo = ?";

    const [usuarios] = await pool.execute(query, [correo]);

    if(usuarios.length === 0){
        return res.json({ message: "Si el usuario existe, enviaremos instrucciones por correo." });
    }
    const usuario = usuarios[0];
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    const hashCodigo = crypto.createHash('sha256').update(codigo).digest('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    const insertQuery = "INSERT INTO reset_password(id_usuario, token, expires_at, used) VALUES (?,?,?,false)";
    await pool.execute(insertQuery,[usuario.id_usuario, hashCodigo, expiresAt]);

    await sendEmail(
        usuario.correo,
        'Reestablece tu contraseña',
        `<p>Hola ${usuario.nombre},</p>
        <p>Tu código de verificación es: <b>${codigo}</b></p>
        <p>Este código expira en 15 minutos.</p>
        <p> No compartas tu código de verificación con nadie fuera de la app. </p>`

    );


    return res.json({message: "Si el usuario existe, enviaremos instrucciones por correo."});
});

export default router;