import express from 'express';
import pool from '../lib/conexion.mjs';
const router = express.Router();

router.post('/ingreso', async (req, res)=>{
    const { tipo, concepto, id, sumaIngreso, monto} = req.body;

    if(!tipo || !concepto || !sumaIngreso || !monto){
        return res.status(400).json({error: "Todos los campos son obligatorios!"});
    }

    try{
        const query = "INSERT INTO movimientos(tipo_movimiento, concepto, id_usuario, saldo, monto) VALUES (?, ?, ?, ?, ?)";

        const [respone] = await pool.execute(query,[tipo, concepto, id, sumaIngreso, monto]);
        return res.status(201).json({message: "Movimiento registrado con exito!"});
    }
    catch(error){
        console.error("Error al insertar los datos: ",  error);
        return res.status(500).json("Error interno al insertar los datos");
    }
})

export default router;