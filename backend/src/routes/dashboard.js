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
});

router.post('/gasto', async (req, res)=>{
    const {tipo, concepto, id, restaGasto, monto} = req.body;

    if(!tipo || !concepto || !restaGasto || !monto){
        return res.status(400).json({error: 'Todos los campos son obligatorios'});

    }

    try{
        const query = "INSERT INTO movimientos(tipo_movimiento,concepto, id_usuario, saldo, monto) VALUES(?,?,?,?,?)";
        const [response] = await pool.execute(query, [tipo, concepto, id, restaGasto, monto]);
        return res.status(201).json({message:"Movimiento registrado con exito"});
    }
    catch(error){
        console.error("Error al insertar los datos: ",  error);
        return res.status(500).json("Error interno al insertar los datos");
    }
});

router.get('/saldo/:id', async (req, res)=>{
   const {id} = req.params;

   if(!id){
       return res.status(400).json({error: "No se pudo obtener el id del usuario"});
   }

   try{
       const query = "SELECT saldo FROM movimientos WHERE id_usuario = ? ORDER BY id_movimiento DESC LIMIT 1";
       const [response] = await pool.execute(query, [id]);

       if(response.lenth === 0){
           return res.status(200).json({saldo:0});
       }

       return res.status(200).json(response[0]);
   }
   catch(error){
       console.error("Error al obtener el saldo del usuario", error);

       return res.status(500).json("Error interno del servidor al obtener el saldo del usuario");
   }
});

export default router;