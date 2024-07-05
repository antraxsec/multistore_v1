"use client";
import React, { useState } from "react";
import Login from "./componets/Login";
import Registro from "./componets/Registro";

export default function Home() {
  const [mostrarLogin, setMostrarLogin] = useState(true); // Estado para alternar entre login y registro

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {mostrarLogin ? (
        <>
          <Login />
          <div className="text-sm font-medium text-gray-900 dark:text-white mt-4">
            ¿No estás registrado aún?{" "}
            <button
              className="text-blue-600 hover:underline dark:text-blue-500"
              onClick={() => setMostrarLogin(false)}
            >
              Crear cuenta
            </button>
          </div>
        </>
      ) : (
        <>
          <Registro />
          <div className="text-sm font-medium text-gray-900 dark:text-white mt-4">
            ¿Ya tienes cuenta?{" "}
            <button
              className="text-blue-600 hover:underline dark:text-blue-500"
              onClick={() => setMostrarLogin(true)}
            >
              Iniciar sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
}
