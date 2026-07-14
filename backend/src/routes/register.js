import bcrypt from "bcrypt";
import express from "express";
import pool from "../lib/conexion.mjs";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, lastname, email, password } = req.body;

  if (!email || !password || !name || !lastname) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "La contraseña debe contener al menos 8 caracteres." });
  }
  try {

    //Validar correo
    const queryCorreo = "SELECT correo FROM usuarios WHERE correo = ?";
    const [response] = await pool.execute(queryCorreo,[email]); 
    if(response.length>0){
      return res.status(400).json({error:"Correo ya registrado"});
    }

    const query =
      "INSERT INTO usuarios( nombre, apellido, correo, password) VALUES (?, ?, ?, ?)";
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(query, [name, lastname, email, hash]);
    return res.status(201).json({ message: "usuario registrado con exito" });
  } 
  catch (error) {
    console.error("Error al insertar los datos: ", error.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
