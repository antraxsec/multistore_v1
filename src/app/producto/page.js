"use client";
import React, { useEffect, useState } from "react";
import Nav from "../componets/Nav";
import Aside from "../componets/Aside";
import Cuerpo from "../componets/Cuerpo";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "../componets/Loading";

export default function page() {
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    const auth = getAuth(app); // Utiliza la instancia de la aplicación Firebase inicializada
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuario está autenticado
        setActivo(true);
      } else {
        // Usuario no está autenticado
        router.push("/", { scroll: false });
      }
    });
  }, []);

  if (!activo) {
    return <Loading />;
  }
  return (
    <div>
      <Nav />
      <Aside />
      <Cuerpo />
    </div>
  );
}
