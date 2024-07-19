"use client";
import Nav from "@/components/Nav";
import LaptopSalesReport from "./LaptopSalesReport";
import Aside from "@/components/Aside";
import { useEffect, useState } from "react";

export default function ReportPage() {
  const [productos, setProductos] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch("/api/productos"); // Ruta a tu endpoint API
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      console.log("data api", data);
      setProductos(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // ... aquí iría el array de datos que proporcionó
  return (
    <div>
      <Nav />
      <Aside />
      <div class="p-4 sm:ml-64">
        <div class=" dark:border-gray-700 mt-14">
          <LaptopSalesReport salesData={productos} />
        </div>
      </div>
    </div>
  );
}
