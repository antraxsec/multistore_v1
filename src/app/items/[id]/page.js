import React from "react";
import { IoEarthOutline } from "react-icons/io5";

export default function page({ params }) {
  const { id } = params;
  return (
    <div>
      <IoEarthOutline className="w-10 h-10 hover:bg-slate-500" />
    </div>
  );
}
