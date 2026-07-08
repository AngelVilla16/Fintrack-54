import cors from "cors";
import express from "express";
import login from "./routes/login.js";
import register from "./routes/register.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/register", register);
app.use("/api/login", login);
const PORT = 3000;

app.listen(PORT, () => console.log("Servidor corriendo en el puerto 3000"));
