// app/api/usuarios/route.js
import { db } from "../../../utils/db";

export async function GET(req) {
  try {
    const [rows] = await db.query("SELECT * FROM usuario_a");
    console.log(rows); // Esto imprimirá los datos en la consola del servidor
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error); // Esto imprimirá cualquier error en la consola del servidor
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
