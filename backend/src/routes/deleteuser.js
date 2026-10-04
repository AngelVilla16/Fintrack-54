import express from 'express';
import pool from '../lib/conexion.mjs';

const router = express.Router();

router.delete("/deleteusuario/:id", async (req, res)=>{

    const { id } = req.params;

    if(!id){
        return res.status(400).json({error: "Error al obtener su id"});
    }
    try{
        const deletemovs = "DELETE FROM movimientos WHERE id_usuario = ?";
        const [responsemovs] = await pool.query(deletemovs, [id]);
        const deleteuser = "DELETE FROM usuarios WHERE id_usuario = ?";
        const [response] = await pool.query(deleteuser, [id]);

        return res.status(200).json({message: "Usuario eliminado con exito"});
    }
    catch(error){
        console.error("Error al eliminar al usuario: ", error);
        return res.status(500).json({error: "Error al eliminar al usuario"});
    }
});

export default router;