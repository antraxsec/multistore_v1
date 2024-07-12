"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useProductos } from "@/context/Context";
import {
  BiSearch,
  BiSolidBeenHere,
  BiMobileAlt,
  BiSolidHand,
  BiSolidUser,
  BiPlusMedical,
  BiRightArrowAlt,
} from "react-icons/bi";
import FlexSearch from "flexsearch";
const UserList = ({ onSelectUser }) => (
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="p-4">
            <div className="flex items-center">
              <label htmlFor="checkbox-all-search" className="sr-only">
                checkbox
              </label>
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            Usuario
          </th>
          <th scope="col" className="px-6 py-3">
            Etiqueta
          </th>
          <th scope="col" className="px-6 py-3">
            Estado
          </th>
          <th scope="col" className="px-6 py-3">
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          className="bg-white border-b hover:bg-gray-50"
          onClick={() => onSelectUser("Neil Sims")}
        >
          <td className="w-4 p-4">1</td>
          <th
            scope="row"
            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
          >
            <BiSolidUser className="w-10 h-10" />
            <div className="ps-3">
              <div className="text-base font-semibold">Neil Sims</div>
              <div className="font-normal text-gray-500">
                neil.sims@flowbite.com
              </div>
            </div>
          </th>
          <td className="px-6 py-4">React Developer</td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
              Online
            </div>
          </td>
          <td className="px-6 py-4">
            <button className="text-sm p-2 rounded-2xl border">
              Seleccionar
            </button>
          </td>
        </tr>
        <tr
          className="bg-white border-b hover:bg-gray-50"
          onClick={() => onSelectUser("Bonnie Green")}
        >
          <td className="w-4 p-4">2</td>
          <th
            scope="row"
            className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            <BiSolidUser className="w-10 h-10" />
            <div className="ps-3">
              <div className="text-base font-semibold">Bonnie Green</div>
              <div className="font-normal text-gray-500">
                bonnie@flowbite.com
              </div>
            </div>
          </th>
          <td className="px-6 py-4">Designer</td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
              Online
            </div>
          </td>
          <td className="px-6 py-4">
            <button className="text-sm p-2 rounded-2xl border">
              Seleccionar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const Chat = ({ user, onBack }) => (
  <div>
    <button
      onClick={onBack}
      className="mb-4 p-5 shadow-md border border-gray-200 rounded-lg mt-3 flex justify-between items-center hover:shadow-xl"
    >
      Regresar <BiRightArrowAlt className="ml-2" />
    </button>
    <h2 className="text-2xl font-semibold mb-4">Chat con {user}</h2>
    <div className="p-4 border border-gray-200 rounded-xl">
      <p>Aquí irían los mensajes del chat con {user}...</p>
    </div>
    <div className="mt-4">
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-4"
        placeholder="Escribe un mensaje..."
      />
    </div>
  </div>
);

export default function Page() {
  const { productos, productosFiltrados } = useProductos();
  const [selectedUser, setSelectedUser] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState([]);
  useEffect(() => {
    if (busqueda.length > 0) {
      const productosDatos = productos;

      // Crear un nuevo índice con FlexSearch
      const index = new FlexSearch.Index({
        tokenize: "forward",
      });

      productosDatos.forEach((producto) => {
        index.add(
          producto.id_producto,
          `${producto.id_producto} ${producto.nombre_marca} ${producto.nombre_linea} ${producto.nombre_modelo} ${producto.referencia_producto}`
        );
      });

      // Realizar la búsqueda
      const resultadosIds = index.search(busqueda, {
        // Configura las opciones de búsqueda según necesites
      });

      const coincidencias = resultadosIds.map((id) =>
        productosDatos.find((p) => p.id_producto === id)
      );

      if (coincidencias.length > 0) {
        console.log("si hay productosBruto");
        console.log(coincidencias);
        setFiltros(coincidencias);
      } else {
        setFiltros([]);
        console.log("no hay productosBruto");
      }
    }
  }, [busqueda]);

  //////////
  const [number, setNumber] = useState("");
  //const [action, setAction] = useState("");
  const [productIds, setProductIds] = useState("");

  const sendMessage = async (action) => {
    console.log(action, number);
    try {
      const response = await axios.post("http://localhost:3000/send-message", {
        number,
        action,
        data: action === "producto" ? productIds : null,
      });
      if (response.data.status === "success") {
        alert("Mensaje enviado!");
      } else {
        alert("Error al enviar el mensaje");
      }
    } catch (error) {
      console.error("Error al enviar el mensaje", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-6 border border-gray-200 shadow-md rounded-xl">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <img src="/qr.png" alt="QR Code" />
              <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <BiMobileAlt className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-4"
                  placeholder="Celular"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                onClick={() => sendMessage("promocion")}
                className="p-4 rounded-lg border border-gray-300 flex justify-center items-center shadow-md mb-4 w-full"
              >
                Promoción
                <BiSolidHand className="ml-2" />
              </button>
              <button
                onClick={() => sendMessage("producto")}
                className="p-4 rounded-lg border border-gray-300 flex justify-center items-center shadow-md mb-4 w-full"
              >
                Productos
                <BiSolidBeenHere className="ml-2" />
              </button>
              <button
                onClick={() => sendMessage("ubicacion")}
                className="p-4 rounded-lg border border-gray-300 flex justify-center items-center shadow-md mb-4 w-full"
              >
                Ubicación
                <BiSolidBeenHere className="ml-2" />
              </button>
              <button
                onClick={() => sendMessage("procesoCompra")}
                className="p-4 rounded-lg border border-gray-300 flex justify-center items-center shadow-md mb-4 w-full"
              >
                Enviar Proceso de Compra
                <BiSolidBeenHere className="ml-2" />
              </button>
              <button
                onClick={() => sendMessage("formasPago")}
                className="p-4 rounded-lg border border-gray-300 flex justify-center items-center shadow-md mb-4 w-full"
              >
                Formas de Pago
                <BiSolidBeenHere className="ml-2" />
              </button>

              {/* {action === "producto" && (
                <input
                  type="text"
                  placeholder="IDs de productos (separados por coma)"
                  value={productIds}
                  onChange={(e) => setProductIds(e.target.value)}
                />
              )} */}
              <button onClick={sendMessage}>Enviar Mensaje</button>
            </div>
          </div>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <BiSearch />
            </div>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value.toLowerCase())}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-4"
              placeholder="Buscar"
            />
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    SKU
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Producto
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Precio
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtros.map((row, i) => (
                  <tr key={i} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 "
                    >
                      <small>{row.id_producto}</small>
                    </th>
                    <td className="px-6 py-4"> {row.referencia_producto}</td>
                    <td className="px-6 py-4">
                      {row.precios[0]?.valor_precio}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setProductIds(row.id_producto);
                          sendMessage("producto");
                        }}
                        className="  text-sm p-2 rounded-2xl border shadow-md hover:shadow-lg hover:border-gray-300"
                      >
                        Enviar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          {!selectedUser && <UserList onSelectUser={setSelectedUser} />}
          {selectedUser && (
            <Chat user={selectedUser} onBack={() => setSelectedUser(null)} />
          )}
        </div>
      </div>
    </div>
  );
}
