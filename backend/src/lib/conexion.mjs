import 'dotenv/config';
import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true, 
    connectionLimit: 10,
    queueLimit: 0
});

async function testConnection() {
    try {
     
        const connection = await pool.getConnection();
        console.log("¡Conexión correcta con la base de datos MySQL!");
        connection.release(); 
    } catch (error) {
        console.error("Error crítico al conectar con la base de datos: ", error.message);
    }
}

testConnection();

export default pool;