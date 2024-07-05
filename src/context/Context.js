"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const ProductosContext = createContext();
export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error("useProductos must be used within a ProductosProvider");
  }
  return context;
};

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({});
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [mostrarslider, setMostrarslider] = useState(true);
  const [user, setUser] = useState(null);
  // Función para guardar en localStorage
  const guardarEnLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Función para recuperar de localStorage
  const recuperarDeLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  const fetchProducto = async () => {
    try {
      const response = await fetch(
        "https://multilaptops.net/api/productoscomp?token=j6UWgtktboQBFD4G",
        { cache: "no-store" }
      );
      const data = await response.json();
      let datosNuevosdos = Object.values(data);
      console.log(datosNuevosdos);
      const datosNuevos = Object.values(datosNuevosdos[2].datos);
      const datosAlmacenados = recuperarDeLocalStorage("productos");
      //Comparamos los datos nuevos con los almacenados
      if (JSON.stringify(datosNuevos) !== JSON.stringify(datosAlmacenados)) {
        console.log("Actualizando datos...");
        setProductos(Object.values(datosNuevos));
        guardarEnLocalStorage("productos", datosNuevos);
        setProductosFiltrados(datosNuevos);
      } else {
        console.log("Los datos no han cambiado, no se requiere actualización.");
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  // Efecto para cargar productos y recuperar productos filtrados al iniciar
  useEffect(() => {
    const productosLocales = recuperarDeLocalStorage("productos");
    if (productosLocales) {
      setProductosFiltrados(productosLocales);
      setProductos(Object.values(productosLocales));
    }
    fetchProducto(); // Siempre se llama, pero actualiza solo si hay cambios.
    // Asumiendo que tienes lógica similar para precioGanancia, tipoMoneda, etc.
    setUser(recuperarDeLocalStorage("user"));
  }, []);

  const filtrar = (data) => {
    guardarEnLocalStorage("productosFiltrados", data);
    setProductosFiltrados(data);
  };

  return (
    <ProductosContext.Provider
      value={{
        producto,
        productos,
        filtrar,
        productosFiltrados,
        setMostrarslider,
        mostrarslider,
        user,
        setUser,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
