"use client"
import { useProductos } from "@/context/Context";
import Link from "next/link";
function Cardimprimir({ producto }) {
    console.log('card producto uno', producto)

    const { precioGanacia, isChecked } = useProductos();

    const obtenerImagenUrl = () => {
        const imagen = Object.values(producto.imagenes).find(
            (row) => row.cod_albumtipo === "5"
        );
        return imagen
            ? `https://multilaptops.net/${imagen.ruta_img}`
            : `https://multilaptops.net/recursos/imagenes/productos/sin_imagen.webp`;
    };

    /**
     * para mostrar solo 4 palbras
     */
    function getFourWords(paragraph) {
        const words = paragraph.split(" ");
        const firstFourWords = words.slice(0, 4);
        return firstFourWords.join(" ");
    }

    return (
        <div className='mb-[50px]'>
            <div className=" rounded-3xl border border-gray-400 h-full p-5"> {/* shadow-sm flex flex-col items-center p-2 sm:max-w-sm h-[500px] card-hover */}

                <img
                    className="w-full h-48 object-contain sombra-png"
                    src={obtenerImagenUrl()}
                    alt="Producto"
                />

                <div className="flex flex-col justify-between flex-grow w-full ">
                    <p className="mt-1 text-lg font-bold tracking-tight text-gray-900 sm:text-xl text-left ps-2">
                        {producto.nombre_marca} {producto.id_producto}
                    </p>
                    <hr className="my-2"></hr>

                    <div className="text-left w-full px-2 ">
                        {[
                            "Procesador",
                            // "Serie de procesador",
                            // "Generación del procesador (Intel)",
                            "Memoria RAM",
                            "Unidad de estado solido (SSD)",
                            "Disco duro (HDD)",
                            "Pantalla",
                            "Gráficos",
                            // "Gráficos",
                        ].map((cualidad, index) => {
                            // Primero, filtramos las especificaciones que coincidan con la cualidad actual.
                            const especificacionesFiltradas = Object.values(producto.especificacion).filter(row => row.cualidad === cualidad);

                            // Solo procedemos a renderizar si hay al menos una especificación válida.
                            if (especificacionesFiltradas.length > 0) {
                            return (
                                <div key={index}>
                                <h6 className="text-xs sm:text-sm font-bold text-gray-900 mt-1">
                                    {cualidad}
                                </h6>
                                {especificacionesFiltradas.map((row, i) => (
                                    // Aquí puedes elegir mostrar las primeras cuatro palabras o la referencia completa.
                                    <p key={i} className="text-gray-700">
                                    - {row.referencia_esp} {/* Si necesitas usar getFourWords, reemplaza row.referencia_esp por getFourWords(row.referencia_esp) */}
                                    </p>
                                ))}
                                </div>
                            );
                            }
                            // Si no hay especificaciones válidas, no retornamos nada para esta cualidad.
                            return null;
                        })}
                    </div>


                    <div className="my-5 flex flex-col items-center">
                        <div className="multilaptops-text">
                            <span className="color-one text-1xl font-bold">Multi</span>
                            <span className="color-two text-1xl font-bold">Laptops</span>
                        </div>
                        {/* {isChecked ? (
                            <span className="text-2xl font-bold text-gray-900 sm:text-2xl mb-0 card-info-element">
                                Bs{" "}
                                {(
                                    (Number(producto.costo_avg) + precioGanacia) *
                                    Number(producto.factor_avg)
                                ).toFixed(2)}
                            </span>
                        ) : null} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cardimprimir;
