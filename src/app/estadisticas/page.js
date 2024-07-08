"use client";

import { useEffect, useState } from "react";
import Aside from "../componets/Aside";
import Nav from "../componets/Nav";
import SalesComponent from "./SalesComponent";

export default function page() {
  const [usuarios, setUsuarios] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch("/api/usuarios"); // Ruta a tu endpoint API
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      console.log("data api", data);
      setUsuarios(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Nav />
      <Aside />

      <SalesComponent salesData={usuarios} />
    </div>
  );
}
