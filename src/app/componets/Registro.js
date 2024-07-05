"use client";
import React, { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { useProductos } from "@/context/Context";
import { useRouter } from "next/navigation";
const Registro = () => {
  const router = useRouter();
  const { setUser } = useProductos();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [celular, setCelular] = useState("");
  const [rol, setRol] = useState("admin");
  const [error, setError] = useState("");
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [codigo, setCodigo] = useState("");
  const [suspense, setSuspense] = useState(false);

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        // Usuario está logueado
        setUsuarioLogueado(usuario);
      } else {
        // Usuario no está logueado
        setUsuarioLogueado(null);
      }
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuspense(true);

    if (codigo === "david666") {
      setError("");

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Guarda la información adicional en Firestore
        await setDoc(doc(db, "usuarios", user.uid), {
          email: user.email,
          nombre: nombre,
          celular: celular,
          rol: rol,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email,
            nombre: nombre,
            celular: celular,
            rol: rol,
          })
        );
        setUser({
          email: user.email,
          nombre: nombre,
          celular: celular,
          rol: rol,
        });

        console.log("Usuario registrado con éxito", {
          email: user.email,
          nombre: nombre,
          celular: celular,
          rol: rol,
        });
        setSuspense(false);
        router.push("/producto", { scroll: false });
      } catch (error) {
        setError("Error en el registro: " + error.message);
      }
    } else {
      setError("No eres Admin");
      setSuspense(false);
    }
  };

  // const handleLogout = async () => {
  //     try {
  //         await signOut(auth);
  //         console.log('Sesión cerrada con éxito');
  //     } catch (error) {
  //         console.error('Error cerrando la sesión: ', error);
  //     }
  // };

  return (
    <div className="">
      <h1 className="text-center my-3 sm:block text-1xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-2xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-[#2e60de] from-sky-200">
          Registrar
        </span>{" "}
      </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label> */}
          <input
            placeholder="Nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-3">
          {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo Electrónico</label> */}
          <input
            placeholder="Correo Electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-3">
          {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label> */}
          <input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-3">
          {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Celular</label> */}
          <input
            placeholder="Celular"
            type="tel"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-3">
          {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol:</label> */}
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="admin">Admin</option>
            <option value="afiliado">Afiliado</option>
            <option value="vendedor">Vendedor</option>
          </select>
        </div>
        <div className="mb-3">
          {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Celular</label> */}
          <input
            placeholder="Codigo"
            type="password"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {suspense ? (
          <button
            disabled
            type="button"
            className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Cargando...
          </button>
        ) : (
          <button
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            type="submit"
          >
            Registrarse
          </button>
        )}
      </form>
      {/* {usuarioLogueado ? (
                <>
                    <p>Usuario logueado: {usuarioLogueado.email}</p>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </>
            ) : (
                <p>No hay usuario logueado</p>
            )} */}
    </div>
  );
};

export default Registro;
