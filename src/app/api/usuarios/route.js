// app/api/usuarios/route.js
import { db } from "../../../utils/db";

export async function GET(req) {
  try {
    const [rows] = await db.query(`SELECT
	usuario_a.cod_usuario,usuario_a.u_usuario, 
	cuenta_a.cod_cuenta, 
	salida_v.cod_salida,salida_v.unidades_salida,salida_v.valortotal_salida,salida_v.fechaini_salida
FROM
	usuario_a
	LEFT JOIN
	cuenta_a
	ON 
		usuario_a.cod_usuario = cuenta_a.cod_usuarioFK
	INNER JOIN
	salida_v
	ON 
		cuenta_a.cod_cuenta = salida_v.cod_responsableFK
`);
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
