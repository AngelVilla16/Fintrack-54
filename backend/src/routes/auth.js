import bcrypt from 'bcrypt';
import express from 'express';
import pool from '../lib/conexion.mjs';
const router = express.Router();


router.post('/register', async(req, res)=>{
    const {name, lastname, email, password} = req.body;

    if(!email || !password || !name || !lastname){
      return res.status(400).json({error:'Todos los campos son obligatorios'});
    }
    try{
        const query = 'INSERT INTO usuarios( nombre, apellido, correo, password) VALUES (?, ?, ?, ?)';
        const hash = await bcrypt.hash(password,10);
        const [result] = await pool.execute(query, [name,lastname,email, hash]);
       return res.status(201).json({message:"usuario registrado con exito"});
    }
    catch(error){
        console.error("Error al insertar los datos: ", error.message);
        return res.status(500).json({error: "Error interno del servidor"});
    }
  
});

export default router;