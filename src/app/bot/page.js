"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
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
import io from "socket.io-client";

const socket = io("https://3bbg85z6-3000.brs.devtunnels.ms");

const UserList = ({ users, onSelectUser, setNumber }) => {
  function limpiarNumero(numero) {
    const prefijo = "591";
    const sufijo = "@c.us";

    // Verificar si el número empieza con el prefijo y termina con el sufijo
    if (numero.startsWith(prefijo) && numero.endsWith(sufijo)) {
      // Eliminar el prefijo y el sufijo
      return numero.slice(prefijo.length, numero.length - sufijo.length);
    }

    // Si no cumple con el formato esperado, devolver el número original
    return numero;
  }
  return (
    <div className="relative shadow-md sm:rounded-lg">
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
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              className="bg-white border-b hover:bg-gray-50"
              onClick={() => onSelectUser(user)}
            >
              <td className="w-4 p-4">{index + 1}</td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
              >
                <BiSolidUser className="w-10 h-10" />
                <div className="ps-3">
                  <div className="text-base font-semibold">
                    {user.notifyName}
                  </div>
                  <div className="font-normal text-gray-500">{user.from}</div>
                </div>
              </th>
              <td className="px-6 py-4">
                <button
                  onClick={() => setNumber(limpiarNumero(user.from))}
                  className="text-sm p-2 rounded-2xl border"
                >
                  Seleccionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Page() {
  const { productos, productosFiltrados } = useProductos();
  const [selectedUser, setSelectedUser] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState([]);
  const [loadingButton, setLoadingButton] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [qr, setQr] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (busqueda.length > 0) {
      const productosDatos = productos;

      const index = new FlexSearch.Index({
        tokenize: "forward",
      });

      productosDatos.forEach((producto) => {
        index.add(
          producto.id_producto,
          `${producto.id_producto} ${producto.nombre_marca} ${producto.nombre_linea} ${producto.nombre_modelo} ${producto.referencia_producto}`
        );
      });

      const resultadosIds = index.search(busqueda, {});

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

  useEffect(() => {
    socket.on("new_message", (data) => {
      setUsers((prevUsers) => {
        const userExists = prevUsers.some((user) => user.from === data.from);
        if (!userExists) {
          return [...prevUsers, data];
        }
        return prevUsers;
      });

      if (selectedUser && selectedUser.from === data.from) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    socket.on("qr", (qr) => {
      setQr(qr);
    });

    socket.on("status", (status) => {
      setStatus(status);
    });

    return () => {
      socket.off("new_message");
      socket.off("qr");
      socket.off("status");
    };
  }, [selectedUser]);

  const [number, setNumber] = useState("");
  const [productIds, setProductIds] = useState("");

  const sendMessage = async (action) => {
    console.log(action, number);
    setLoadingButton(action);
    try {
      const response = await axios.post(
        "https://3bbg85z6-3000.brs.devtunnels.ms/send-message",
        {
          number,
          action,
          data: action === "producto" ? productIds : null,
        }
      );
      if (response.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Mensaje enviado!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al enviar el mensaje",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error al enviar el mensaje", error);
      Swal.fire({
        icon: "error",
        title: "Error al enviar el mensaje",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoadingButton("");
    }
  };

  return (
    <div className="px-2 mt-3">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-6 border border-gray-200 shadow-md rounded-xl">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              {qr ? (
                <img src={qr} alt="QR Code" className="w-full" />
              ) : (
                <p>Esperando código QR...</p>
              )}
              <p>Estado: {status}</p>
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
                disabled={loadingButton === "promocion"}
              >
                {loadingButton === "promocion" ? "Cargando..." : "Promoción"}
                <BiSolidHand className="ml-2" />
              </button>

              <button
                onClick={() => sendMessage("ubicacion")}
                className="p-4 rounded-lg border border-gray-300 flex justify-center items-center shadow-md mb-4 w-full"
                disabled={loadingButton === "ubicacion"}
              >
                {loadingButton === "ubicacion" ? "Cargando..." : "Ubicación"}
                <BiSolidBeenHere className="ml-2" />
              </button>
              <button
                onClick={() => sendMessage("procesoCompra")}
                className="p-4 rounded-lg border border-gray-300 flex justify-center items-center shadow-md mb-4 w-full"
                disabled={loadingButton === "procesoCompra"}
              >
                {loadingButton === "procesoCompra"
                  ? "Cargando..."
                  : "Enviar Proceso de Compra"}
                <BiSolidBeenHere className="ml-2" />
              </button>
              <button
                onClick={() => sendMessage("formasPago")}
                className="p-4 rounded-lg border border-gray-300 flex justify-center items-center shadow-md mb-4 w-full"
                disabled={loadingButton === "formasPago"}
              >
                {loadingButton === "formasPago"
                  ? "Cargando..."
                  : "Formas de Pago"}
                <BiSolidBeenHere className="ml-2" />
              </button>
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
                        className="text-sm p-2 rounded-2xl border shadow-md hover:shadow-lg hover:border-gray-300"
                        disabled={loadingButton === "producto"}
                      >
                        {loadingButton === "producto"
                          ? "Cargando..."
                          : "Enviar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <UserList
            users={users}
            onSelectUser={setSelectedUser}
            setNumber={setNumber}
          />
        </div>
      </div>
    </div>
  );
}
