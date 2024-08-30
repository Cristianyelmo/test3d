"use client";
import { useEffect, useState } from "react";
import { MichiHook } from "../context/MichiContext";
import Cats from "./view/Cats";
import EditedCats from "./view/EditedCats";
import CreateCats from "./view/CreateCats";

export default function Crud() {
  const { changepage } = MichiHook();
  const [presentacioncrud, setPresentacioncrud] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setPresentacioncrud("hidden");
    }, 2000);
  }, []);
  return (
    <div className="bg-white">
      <div
        className={`bg-black absolute z-30 inset-0 opacity-presentation2 ${presentacioncrud}`}
      ></div>

      <div className="  min-h-screen neon-border3 fondo ">
        {changepage == "Cats" ? (
          <Cats />
        ) : changepage == "EditedCats" ? (
          <EditedCats />
        ) : (
          changepage == "CreateCats" && <CreateCats />
        )}
      </div>
    </div>
  );
}
