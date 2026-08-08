import crypto from 'crypto';
import express from 'express';
import pool from '../lib/conexion.mjs';
const router = express.Router();

router.post('/verify', async (req,res)=>{
    const {correo, codigo} = req.body;

    if( !correo || !codigo){
        return res.status(400).json("Se require un codigo valido");
    }
    const hashCodigo = crypto.createHash('sha256').update(codigo).digest('hex');
    try{
        //Verificar que exista el codigo
        const verifyQuery = `
        SELECT u.id_usuario, u.nombre, u.correo, r.token
        FROM usuarios u
        JOIN reset_password r ON u.id_usuario = r.id_usuario
        WHERE u.correo = ? AND r.token = ? AND r.used = false AND r.expires_at > NOW()
        `;
        const [resultado] = await pool.execute(verifyQuery, [correo, hashCodigo]);

        if(resultado.length === 0){
            return res.status(400).json({message: "El código expiro o es invalido"})
        }
        return res.json({message:"Código valido"});
    }
    catch (error){
        console.error("Error al validar el token ", error);
    }


});

export default router;