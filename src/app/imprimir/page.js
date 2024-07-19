"use client";
import { useEffect, useState } from "react";
//import api from '../api';
import Cuerpo from "./Cuerpo";
import Loading from "../componets/Loading";

export default function page() {
  const [productonew, setProductonew] = useState([]);
  const [activo, setActivo] = useState(false);
  const fetchProducto = async () => {
    try {
      const response = await fetch(
        "https://multilaptops.net/api/productosdisp?token=j6UWgtktboQBFD4G",
        { cache: "no-store" }
      );
      const data = await response.json();
      let datosNuevos = Object.values(data.datos);
      setProductonew(datosNuevos);
      setActivo(true);
      // console.log(datosNuevos)
      // const datosAlmacenados = recuperarDeLocalStorage("productos");
      // // Comparamos los datos nuevos con los almacenados
      // if (JSON.stringify(datosNuevos) !== JSON.stringify(datosAlmacenados)) {
      //     console.log("Actualizando datos...");

      //     setProductos(datosNuevos);
      //     guardarEnLocalStorage("productos", datosNuevos);
      //     setProductosFiltrados(datosNuevos);
      //     setIsLoaded(true);
      // } else {
      //     console.log("Los datos no han cambiado, no se requiere actualización.");
      // }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };
  useEffect(() => {
    fetchProducto();
  }, []);

  //let productos = await
  console.log("Nuevo datos bien ", productonew);

  function printContent() {
    // Hide elements you don't want to print using JavaScript (optional)
    const elementsToHide = document.querySelectorAll(".hide-on-print");
    elementsToHide.forEach((element) => element.classList.add("hidden"));

    // Trigger print dialog
    window.print();

    // Restore hidden elements (optional)
    elementsToHide.forEach((element) => element.classList.remove("hidden"));
  }

  const generatePdf = () => {
    // Crear una nueva instancia de jsPDF
    const pdf = new jsPDF();

    // Agregar texto al documento
    pdf.text("¡Hola, este es tu PDF generado!", 10, 10);

    // Agregar más elementos según sea necesario
    // pdf.addImage, pdf.setFont, pdf.setLineWidth, etc.

    // Guardar el documento generado
    pdf.save("documento-generado.pdf");
  };

  if (!activo) {
    return <Loading />;
  }

  return (
    <>
      <Cuerpo productos={productonew} />
    </>
  );
}
