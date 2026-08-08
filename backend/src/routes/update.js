import bcrypt from 'bcrypt';
import crypto from 'crypto';
import express from 'express';
import pool from '../lib/conexion.mjs';
const router = express.Router();

router.post('/update', async (req, res)=>{
    const {correo, codigo, password} = req.body;

    if(!password){
        return res.status(400).json({message:"Es requerido una contraseña valida"});

    }
    try{
        //Validamos primero el token
        const hashCodigo = crypto.createHash('sha256').update(codigo).digest('hex');
        const query = `
            SELECT r.id
            FROM usuarios u
            JOIN reset_password r ON u.id_usuario = r.id_usuario
            WHERE u.correo = ? AND r.token = ? AND r.used = false AND r.expires_at > NOW()
        `;
        const [resultado] = await pool.execute(query,[correo, hashCodigo]);

        if(resultado.length === 0){
            return res.status(400).json({message:"Código expirado o incorrecto"});
        }
        const resetId = resultado[0].id;

        const hash = await bcrypt.hash(password, 10);
        const updateQuery = "UPDATE usuarios SET password = ? WHERE correo = ?";
        await pool.execute(updateQuery,[hash, correo]);
        await pool.execute("UPDATE reset_password SET used = true WHERE id = ?", [resetId]);


        return res.status(200).json({message:"Contraseña actualizada correctamente"});
        
    }
    catch(error){
        console.error("Error al actualizar la contraseña: ", error);
        return res.status(500).json({ message: "Error al actualizar la contraseña" });
    }
});
export default router;