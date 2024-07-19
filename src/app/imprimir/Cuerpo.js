"use client";
import React, { useEffect, useState } from "react";
import Cardimprimir from "../componets/Cardimprimir";

export default function Cuerpo({ productos }) {
  console.log("productos", productos);
  const [mostrar, setMostrar] = useState(true);
  const [idsFiltrar, setIdsFiltrar] = useState([]);
  const [productosfiltrados, setProductosfiltrados] = useState([]);
  const [sku, setSku] = useState();

  function filtrar() {
    let productosnew = productos.filter((producto) =>
      idsFiltrar.includes(producto.id_producto)
    );
    console.log("Productos filtrados", productosnew);

    localStorage.setItem("productoImprimir", JSON.stringify(productosnew));

    setProductosfiltrados(productosnew);
  }

  function agregar() {
    const nuevoArray = [...idsFiltrar, sku];
    setIdsFiltrar(nuevoArray);
    console.log("Nuevo ", nuevoArray);
    localStorage.setItem("idImprimir", JSON.stringify(nuevoArray));
  }
  useEffect(() => {
    setProductosfiltrados(JSON.parse(localStorage.getItem("productoImprimir")));
    if (JSON.parse(localStorage.getItem("idImprimir")) == undefined) {
      console.log("entro");
    } else {
      setIdsFiltrar(JSON.parse(localStorage.getItem("idImprimir")));
    }
  }, []);

  return (
    <>
      {mostrar ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              value={sku}
              placeholder="sku"
              onChange={(e) => setSku(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <button
              onClick={agregar}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Agregar
            </button>
          </div>
          <div>
            {idsFiltrar.map((row, i) => (
              <div key={i}>
                <small>{row}</small>
                <button
                  onClick={() => {
                    const nuevoArray = idsFiltrar.filter(
                      (item) => item !== row
                    );
                    setIdsFiltrar(nuevoArray);
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
                <br />
              </div>
            ))}
          </div>
          <hr />
          <button
            onClick={() => {
              filtrar();
              setMostrar(false);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            filtrar
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {productosfiltrados.map((row, i) => (
              <Cardimprimir key={i} producto={row} />
            ))}
          </div>
          <button
            onClick={() => {
              setMostrar(true);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            regresar
          </button>
        </>
      )}
    </>
  );
}
