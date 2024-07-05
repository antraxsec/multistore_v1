import Aside from "@/app/componets/Aside";
import Nav from "@/app/componets/Nav";
import Producto from "@/app/componets/Producto";
import React from "react";

export default function page({ params }) {
  const { id } = params;
  return (
    <div>
      <Nav />
      <Aside />
      <Producto id={id} />
    </div>
  );
}
