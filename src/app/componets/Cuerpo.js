"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductos } from "@/context/Context";

export default function Cuerpo() {
  const router = useRouter();
  const { productos, productosFiltrados, precioConfigurado } = useProductos();
  const [productonew, setProductonew] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  // Agrupar data
  function reagruparProductosAplanados(productos) {
    const productosReagrupados = {
      disponibleSinInventario: {
        id: "disponibleSinInventario",
        titulo: "Disponibles para venta online",
        productos: [],
      },
      agotado: { id: "agotado", titulo: "Agotados", productos: [] },
      apedido: { id: "apedido", titulo: "A pedido", productos: [] },
      reserva: { id: "reserva", titulo: "Reservados", productos: [] },
      enTransito: { id: "enTransito", titulo: "En tránsito", productos: [] },
      noDisponible: {
        id: "noDisponible",
        titulo: "No disponibles",
        productos: [],
      },
      exclusivoOnline: {
        id: "exclusivoOnline",
        titulo: "Exclusivos online",
        productos: [],
      },
      disponiblesConInventario: {
        id: "disponiblesConInventario",
        titulo: "Disponibles entrega inmediata",
        productos: [],
      },
    };

    productos.forEach((producto) => {
      if (Number(producto.cantidad) > 0) {
        productosReagrupados.disponiblesConInventario.productos.push(producto);
      } else {
        switch (producto.id_productodisponibilidad) {
          case "5003":
            productosReagrupados.disponibleSinInventario.productos.push(
              producto
            );
            break;
          case "5004":
            productosReagrupados.agotado.productos.push(producto);
            break;
          case "5005":
            productosReagrupados.apedido.productos.push(producto);
            break;
          case "5006":
            productosReagrupados.reserva.productos.push(producto);
            break;
          case "5007":
            productosReagrupados.enTransito.productos.push(producto);
            break;
          case "5008":
            productosReagrupados.noDisponible.productos.push(producto);
            break;
          case "5009":
            productosReagrupados.exclusivoOnline.productos.push(producto);
            break;
          default:
            // Manejo de casos no especificados si es necesario
            break;
        }
      }
    });

    return productosReagrupados;
  }

  useEffect(() => {
    setProductonew(
      Object.values(reagruparProductosAplanados(productosFiltrados))
    );
    setLoading(false); // Actualizar estado de carga a false una vez que los productos se hayan cargado
  }, [productosFiltrados]);

  if (loading) {
    return (
      <div className="p-4 sm:ml-64 bg-gray-50">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          Cargando...
        </div>
      </div>
    ); // Mostrar mensaje de carga
  }

  return (
    <div className="p-4 sm:ml-64 bg-gray-50">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        {productonew.map((producto, q) =>
          producto.productos.length > 0 ? (
            <div key={q}>
              <h1 className="my-2 text-xl font-bold border p-3 rounded-2xl text-gray-50 shadow-md bg-slate-700">
                {producto.titulo.toUpperCase()}
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 my-12">
                {producto.productos.map((row, i) => (
                  <div
                    key={i}
                    onClick={() => router.push(`/producto/${row.id_producto}`)}
                    className="border bg-white rounded-3xl shadow-lg rounded-se-[220px] flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative flex justify-center items-center">
                        {Array.isArray(Object.values(row.imagenes)) &&
                        Object.values(row.imagenes).some(
                          (img) => img.cod_albumtipo === "5"
                        ) ? (
                          <img
                            className="bg-cover bg-center z-10"
                            src={`https://multilaptops.net/${
                              Object.values(row.imagenes).find(
                                (img) => img.cod_albumtipo === "5"
                              ).ruta_img
                            }`}
                            alt={row.nombre_marca}
                            style={{
                              filter:
                                "drop-shadow(0 10px 10px rgba(0, 0, 0, 0.8))",
                            }}
                          />
                        ) : (
                          <img
                            className="bg-cover bg-center z-10"
                            src="https://multilaptops.net/recursos/imagenes/productos/sin_imagen.webp"
                            alt="Imagen por defecto"
                            style={{
                              filter:
                                "drop-shadow(0 10px 10px rgba(0, 0, 0, 0.8))",
                            }}
                          />
                        )}
                        <h5 className="text-center text-white font-mono absolute -bottom-7 left-4 z-10">
                          {row.nombre_marca.toUpperCase()} {row.id_producto}
                        </h5>
                        <div className="absolute bg-gray-700 h-9 w-52 rounded-e-3xl -bottom-8 left-0 z-0 drop-shadow-2xl shadow-slate-950"></div>
                      </div>
                      <div className="pl-6 pr-6 pb-3 mt-12">
                        <p className="text-sm font-sans text-gray-500">
                          {row.referencia_producto.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="pl-6 pr-6 pb-6 ">
                      <h5 className="font-semibold text-center ">
                        Bs.{" "}
                        {Object.values(row.precios).length == 0
                          ? "sin Precio"
                          : Number(row?.precios["0"]?.valor_precio).toFixed(2)}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
