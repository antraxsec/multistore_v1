"use client";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app, db } from "../firebase"; // Asegúrate de que la ruta sea correcta
import { useProductos } from "@/context/Context";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

// Asegúrate de que este es el camino correcto hacia tu archivo de configuración de Firebase.

const Login = () => {
  const router = useRouter();
  const { setUser } = useProductos();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [suspense, setSuspense] = useState(false);

  const auth = getAuth(app);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuspense(true);
    setError("");

    try {
      // Intenta iniciar sesión con email y contraseña
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Intenta recuperar datos adicionales del usuario desde Firestore
      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);

      let userData;
      if (docSnap.exists()) {
        // Si el documento existe, combina los datos de Firestore con los de autenticación
        userData = {
          email: user.email,
          uid: user.uid,
          ...docSnap.data(), // Incorpora los datos adicionales de Firestore
        };
      } else {
        // Si no se encuentran datos adicionales, utiliza solo los datos de autenticación
        userData = {
          email: user.email,
          uid: user.uid,
        };
      }

      // Guarda los datos del usuario en localStorage
      console.log("Guardando usuario en localStorage", userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      // Confirma que los datos se han guardado correctamente en localStorage
      console.log(
        "Usuario guardado en localStorage:",
        localStorage.getItem("user")
      );

      setSuspense(false);
      // Redirección a la página de productos después de guardar los datos
      router.push("/producto", { scroll: false });
    } catch (error) {
      // Maneja errores, como credenciales incorrectas o problemas de red
      setError("Error al iniciar sesión: " + error.message);
      console.error("Error al iniciar sesión:", error);
      setSuspense(false);
    }
  };

  //rediregir si esta logueado
  // const [activo, setActivo] = useState(false);

  // useEffect(() => {
  //     const auth = getAuth(app); // Utiliza la instancia de la aplicación Firebase inicializada
  //     onAuthStateChanged(auth, (user) => {
  //         if (user) {
  //             // Usuario está autenticado
  //             router.push('/productos');
  //         } else {
  //             // Usuario no está autenticado

  //             setActivo(true);
  //         }
  //     });
  // }, []);

  // if (!activo) {
  //     return <Loading />;
  // }

  return (
    <div className="border p-20 rounded-3xl bg-white shadow-md">
      <h1 className="text-center my-3 sm:block text-1xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-2xl">
        <span className="text-gray-500 font-bold text-3xl">Login</span>{" "}
      </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {" "}
            Correo
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {" "}
            Constraseña
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            type="submit"
            className="text-white w-full h-12 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-semibold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Ingresar
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
