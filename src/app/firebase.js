// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUUTGkJe4c5JaGWjJ5SWWc870nrRJcwLU",
  authDomain: "marketplace-2024.firebaseapp.com",
  projectId: "marketplace-2024",
  storageBucket: "marketplace-2024.appspot.com",
  messagingSenderId: "192329567123",
  appId: "1:192329567123:web:d02b3c4d7cb8a588203666",
};

// Inicializa la aplicación Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore con esta instancia de la aplicación
const db = getFirestore(app);

// Exporta tanto `app` como `db`
export { app, db };
