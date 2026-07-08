import bcrypt from 'bcrypt';
import expresss from 'express';
import pool from '../lib/conexion.mjs';
const router = expresss.Router();

router.post("/login", async (req, res)=>{
    const {user, password}= req.body;

    if(!user || !password){
        return res.status(400).json({error: "Todos los campos son requeridos"});
    }
    try{
        const queryValidate = "SELECT id_usuario, nombre, correo, password FROM usuarios WHERE correo = ?";
        const [response] = await pool.execute(queryValidate, [user]);

        if(response.length===0){
            return res.status(401).json({error: "Usuario no existente"});
        }
        
        const usuario = response[0];

        const passwordCorrect = await bcrypt.compare(password, usuario.password);

        if(!passwordCorrect){
            return res.status(401).json({
                error: "Contraseña incorrecta"
               
            });

        }
        
        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            usuario: { id: usuario.id_usuario, nombre: usuario.nombre, correo: usuario.correo }
        });
    }
    catch(error){
        console.error("Error en el login ", error.message);
        return res.status(500).json({error: "Error interno del servidor"});
    }

});

export default router;