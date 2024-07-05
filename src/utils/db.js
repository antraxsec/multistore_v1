// utils/db.js
import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "50.6.160.90",
  user: "antraxse_admin",
  password: "I5+os]rQ=?s&",
  database: "antraxse_smartadmin_1",
});

// Verificar la conexión al importar el archivo
db.getConnection()
  .then((connection) => {
    console.log("Conexión a la base de datos MySQL exitosa.");
    connection.release();
  })
  .catch((error) => {
    console.error("Error conectando a la base de datos MySQL:", error.message);
  });
