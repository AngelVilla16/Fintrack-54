import cors from "cors";
import express from "express";

import dashboard from './routes/dashboard.js';
import login from "./routes/login.js";
import register from "./routes/register.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", register);
app.use("/api/auth", login);
app.use("/api/dash", dashboard);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Servidor corriendo en el puerto 3000"));
