// "use client";
// import { useState } from "react";
// import axios from "axios";

// export default function Home() {
//   const [number, setNumber] = useState("");
//   const [action, setAction] = useState("");
//   const [productIds, setProductIds] = useState("");

//   const sendMessage = async () => {
//     try {
//       const response = await axios.post("http://localhost:3000/send-message", {
//         number,
//         action,
//         data: action === "producto" ? productIds : null,
//       });
//       if (response.data.status === "success") {
//         alert("Mensaje enviado!");
//       } else {
//         alert("Error al enviar el mensaje");
//       }
//     } catch (error) {
//       console.error("Error al enviar el mensaje", error);
//     }
//   };

//   return (
//     <div>
//       <h1>WhatsApp Bot Interface</h1>
//       <input
//         type="text"
//         placeholder="Número de teléfono"
//         value={number}
//         onChange={(e) => setNumber(e.target.value)}
//       />
//       <div>
//         <button
//           className=" border rounded-md p-4"
//           onClick={() => setAction("promocion")}
//         >
//           Reenviar Promoción
//         </button>
//         <button
//           className=" border rounded-md p-4"
//           onClick={() => setAction("producto")}
//         >
//           Seleccionar Productos
//         </button>
//         <button
//           className=" border rounded-md p-4"
//           onClick={() => setAction("ubicacion")}
//         >
//           Enviar Ubicación
//         </button>
//         <button onClick={() => setAction("procesoCompra")}>
//           Enviar Proceso de Compra
//         </button>
//         <button
//           className=" border rounded-md p-4"
//           onClick={() => setAction("formasPago")}
//         >
//           Formas de Pago
//         </button>
//         <button
//           className=" border rounded-md p-4"
//           onClick={() => setAction("chatGPT")}
//         >
//           ChatGPT
//         </button>
//       </div>
//       {action === "producto" && (
//         <input
//           type="text"
//           placeholder="IDs de productos (separados por coma)"
//           value={productIds}
//           onChange={(e) => setProductIds(e.target.value)}
//         />
//       )}
//       <button onClick={sendMessage}>Enviar Mensaje</button>
//     </div>
//   );
// }

import React from "react";

export default function page() {
  return <div>page</div>;
}
