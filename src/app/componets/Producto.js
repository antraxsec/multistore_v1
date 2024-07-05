"use client";
import React, { useState } from "react";
import {
  FaLaptop,
  FaMicrochip,
  FaMemory,
  FaHdd,
  FaBraille,
  FaBookmark,
  FaShareAlt,
  FaWhatsapp,
} from "react-icons/fa";

import { useProductos } from "@/context/Context";
import { useRouter } from "next/navigation";

export default function Producto({ id }) {
  const router = useRouter();
  const { productos, productosFiltrados } = useProductos();
  console.log(productos);

  // Buscar el producto en todos los arrays anidados
  const productoEncontrado = productos.find(
    (producto) => producto.id_producto === id
  );

  const [mostrarTodo, setMostrarTodo] = useState(false);
  if (!productoEncontrado) {
    return <p>Producto no encontrado</p>;
  } else {
    console.log(productoEncontrado);
  }

  const especificaciones = Object.values(productoEncontrado.especificacion);
  const mostrarEspecificaciones = mostrarTodo
    ? especificaciones
    : especificaciones.slice(0, 5);

  return (
    <div className="p-4 sm:ml-64 bg-gray-50">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className=" relative  border rounded-3xl shadow-md  ">
          <div
            className=" absolute z-0 right-0 bg-gradient-to-r bg-opacity-5 opacity-0 lg:opacity-65 from-indigo-400 rounded-bl-[500px] to-purple-400 border rounded-3xl   w-[300px] h-[300px]"
            style={{
              boxShadow: "inset 0px -5px 10px -3px rgba(0, 0, 0, 0.1)",
            }}
          ></div>
          <div className="p-6  grid grid-cols-1 lg:grid-cols-2 first-letter: gap-3 ">
            <div className="p-6">
              <h2 className=" font-bold text-lg p-3 ">
                {productoEncontrado.nombre_marca}
              </h2>

              <h1 className="text-3xl font-extrabold mb-4">
                {productoEncontrado.nombre_linea}
              </h1>

              <p className=" font-sans text-gray-700 mb-4">
                {productoEncontrado.descripcion_producto}
              </p>

              {mostrarEspecificaciones.map((esp, i) => (
                <div className="flex items-center gap-4 mb-3 ml-4" key={i}>
                  {esp.icono_tipocualidad === "fa-light fa-memory" ? (
                    <FaMemory className="w-8 h-8 text-gray-500 " />
                  ) : esp.icono_tipocualidad === "fa-light fa-microchip" ? (
                    <FaMicrochip className="w-8 h-8 text-gray-500 " />
                  ) : esp.icono_tipocualidad === "fa-light fa-hard-drive" ? (
                    <FaHdd className="w-8 h-8 text-gray-500 " />
                  ) : esp.icono_tipocualidad === "fa-light fa-tv" ? (
                    <FaLaptop className="w-8 h-8 text-gray-500 " />
                  ) : esp.icono_tipocualidad === "fa-light fa-puzzle-piece" ? (
                    <FaBraille className="w-8 h-8 text-gray-500 " />
                  ) : (
                    <FaBookmark className="w-8 h-8 text-gray-500" />
                  )}
                  <div className="font-medium ">
                    <div>{esp.cualidad}</div>
                    <div className="text-sm text-gray-500 ">
                      {esp.referencia_esp}
                    </div>
                  </div>
                </div>
              ))}

              {especificaciones.length > 5 && (
                <button
                  onClick={() => setMostrarTodo(!mostrarTodo)}
                  className="mt-4 text-blue-500 hover:text-blue-700"
                >
                  {mostrarTodo ? "Mostrar menos" : "Mostrar más"}
                </button>
              )}
            </div>
            {/* img */}
            <div className=" ">
              {Array.isArray(Object.values(productoEncontrado.imagenes)) &&
              Object.values(productoEncontrado.imagenes).some(
                (img) => img.cod_albumtipo === "5"
              ) ? (
                <img
                  className="bg-cover bg-center z-10"
                  src={`https://multilaptops.net/${
                    Object.values(productoEncontrado.imagenes).find(
                      (img) => img.cod_albumtipo === "5"
                    ).ruta_img
                  }`}
                  alt={productoEncontrado.nombre_marca}
                  style={{
                    filter: "drop-shadow(0 10px 10px rgba(0, 0, 0, 0.8))",
                  }}
                />
              ) : (
                <img
                  className="bg-cover bg-center z-10"
                  src="https://multilaptops.net/recursos/imagenes/productos/sin_imagen.webp"
                  alt="Imagen por defecto"
                  style={{
                    filter: "drop-shadow(0 10px 10px rgba(0, 0, 0, 0.8))",
                  }}
                />
              )}

              <div className="">
                <div className="col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                  <div className="mb-2 font-medium text-gray-800 ">
                    MultiStore | SKU: {id}
                  </div>
                  <ul className="mb-4 -ml-2 flex md:order-1 md:mb-0">
                    <li>
                      <a
                        className="text-muted inline-flex items-center rounded-lg p-2.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
                        aria-label="Twitter"
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z"></path>
                        </svg>
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-muted inline-flex items-center rounded-lg p-2.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
                        aria-label="Instagram"
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                          <path d="M16.5 7.5l0 .01"></path>
                        </svg>
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-muted inline-flex items-center rounded-lg p-2.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
                        aria-label="Facebook"
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                        </svg>
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-muted inline-flex items-center rounded-lg p-2.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
                        aria-label="RSS"
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M5 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                          <path d="M4 4a16 16 0 0 1 16 16"></path>
                          <path d="M4 11a9 9 0 0 1 9 9"></path>
                        </svg>
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-muted inline-flex items-center rounded-lg p-2.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
                        aria-label="Github"
                        href="https://github.com/onwidget/tailnext"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                        </svg>
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-muted inline-flex items-center rounded-lg p-2.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
                        aria-label="Github"
                        href="https://github.com/onwidget/tailnext"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="my-5 flex justify-center items-center">
                <button className="mr-2 rounded-3xl border border-gray-200 text-gray-500 shadow-lg p-3 flex justify-center items-center">
                  <FaWhatsapp className="mx-2 w-7 h-7" />
                </button>
                <button className=" rounded-3xl border bg-gray-800 text-white shadow-xl p-3 flex justify-center items-center">
                  <FaShareAlt className="mx-2" />
                  <p className="mr-2">Compartir</p>
                </button>
              </div>
              <h2 className=" font-serif text-lg  text-end mr-5  text-green-700">
                Bs.{" "}
                {Number(productoEncontrado?.precios["0"]?.valor_precio).toFixed(
                  2
                ) || "Sin precio"}
              </h2>
            </div>
          </div>
        </div>
        <h1 className="my-4 font-bold text-xl">Articulos relacionados</h1>
        <div className=" my-2">
          <div className="  grid grid-cols-1 lg:grid-cols-5 first-letter: gap-3 ">
            {productosFiltrados.slice(0, 5).map((row, i) => (
              <div
                onClick={() => router.push(`/producto/${row.id_producto}`)}
                className="border relative p-6 rounded-2xl shadow-md bg-gray-50"
              >
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
                      filter: "drop-shadow(0 10px 10px rgba(0, 0, 0, 0.8))",
                    }}
                  />
                ) : (
                  <img
                    className="bg-cover bg-center z-10"
                    src="https://multilaptops.net/recursos/imagenes/productos/sin_imagen.webp"
                    alt="Imagen por defecto"
                    style={{
                      filter: "drop-shadow(0 10px 10px rgba(0, 0, 0, 0.8))",
                    }}
                  />
                )}

                <h1 className="text-[12px] font-semibold mb-2">
                  {row.nombre_linea || "Laptops"}
                </h1>
                <p className="text-[10px]">{row.referencia_producto}</p>

                <h2 className=" absolute bottom-2 font-serif text-[10px]  text-end mr-5  text-green-700">
                  Bs.{" "}
                  {Number(
                    productoEncontrado?.precios["0"]?.valor_precio
                  ).toFixed(2) || "Sin precio"}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
