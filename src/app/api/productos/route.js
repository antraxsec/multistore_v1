// app/api/usuarios/route.js
import { useProductos } from "@/context/Context";
import { db } from "../../../utils/db";

export async function GET(req) {
  try {
    const [rows] = await db.query(`
       SELECT
	salida_v.cod_salida,salida_v.unidades_salida,salida_v.valortotal_salida,salida_v.fechaini_salida, 
	carritocompra_producto.cod_carpro, 
	producto_n.id_producto,producto_n.referencia_producto,producto_n.descripcion_producto
FROM
	salida_v
	INNER JOIN
	carrito_compras
	ON 
		salida_v.cod_carritosalidaFK = carrito_compras.cod_carrito
	INNER JOIN
	carritocompra_producto
	ON 
		carrito_compras.cod_carrito = carritocompra_producto.cod_comprasFK
	INNER JOIN
	producto_n
	ON 
		carritocompra_producto.cod_prodFK = producto_n.id_producto
    where salida_v.cod_tiposalidaFK=1
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
