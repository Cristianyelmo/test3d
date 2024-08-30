"use client";
import { useEffect, useRef, useState } from "react";
import Modelss from "../Modelss";
import { MichiHook } from "../../context/MichiContext";
import { MichiCreateAndEditedHook } from "@/app/context/MichiCreateAndEditedContext";
import Image from "next/image";

export default function EditedCats() {
  const {
    getid,
  } = MichiHook();

  const {changeTexture,GetidMichix,Volver,selectedValueEdit, setselectedValueEdit,
    selectedValueEdittext, setselectedValueEdittext,EditedArray,loadingedited,find,errorMessageedit, createandediteloading} = MichiCreateAndEditedHook()
  useEffect(() => {
    console.log(find)

    GetidMichix(getid);
  }, [getid]);

  useEffect(() => {
    if (find && find.textura) {
      setselectedValueEdit({
        anteojos: find.textura[1].name || "",
        ropa: find.textura[2].name || "",
        color: find.textura[0].name || "",
        puntaje:find.puntaje
      });
      setselectedValueEdittext(find.name);
    }
  }, [find]);

 

  



  if (!loadingedited) {
    return <div className="bg-black text-white relative h-screen w-full  fondo-content">
      <div className="absolute inset-0 flex flex-col justify-center items-center">
    <p className="hollow-neon-text text-3xl mb-4">cargando...</p>
    <Image src="/texture/tte.png" width={128} height={128} alt="Cargando" />
  </div>
      </div>;
  } else {
    return (
      <div className="flex flex-col fondo-content  lg:flex-row fondo-content justify-center items-center min-h-screen">
         { createandediteloading &&  <div
            className={`fixed inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-70 
  transition-opacity duration-500 ease-in-out`}
          ></div>}
        <button className="neon-border-volver p-4 mr-4 mb-4" onClick={Volver}>volver</button>
        <div className="animation-open  z-50 flex flex-col items-center">
          <Modelss texture={find.textura} editandcreate={true} />

          <input  readOnly={createandediteloading}
           className="w-[300px] neon-border-input mt-4 p-2"
            onChange={(e) => {
              setselectedValueEdittext(e.target.value);
            }}
            type="text"
            value={selectedValueEdittext}
          />
        </div>
        <div className="space-y-4 ml-10 mt-10 lg:mt-0 ">
          <div>
          <p className="text-[#dd0303]">Anteojos</p>
        <select
          value={selectedValueEdit.anteojos}
             className="neon-border2"
          onChange={(e) => {
            setselectedValueEdit((prevState) => ({
              ...prevState,
              anteojos: e.target.value,
            }));
            changeTexture(e.target.value, "Cube001");
          }}
        >
         <option value="Proyecto nuevocvc.png">Harry Potter</option>
        <option value="Proyecto nuevocvc1.png">Rojos</option>
        <option value="Proyecto nuevocvc2.png">Negros</option>
        <option value="Proyecto nuevocvc3.png">3D</option>
        <option value="Proyecto nuevocvc4.png">Ciclope</option>
        <option value="Proyecto nuevocvc5.png">Vaporwave</option>
        <option value="Proyecto nuevocvc6.png">Corazones</option>
        <option value="Proyecto nuevocvc7.png">Naranja</option>
        <option value="nada">Nada</option>
        </select>
        </div>
        <div>
        <p className="text-[#1774ff]">Ropa</p>
        <select
          value={selectedValueEdit.ropa}
           className="neon-border-editar"
          onChange={(e) => {
            setselectedValueEdit((prevState) => ({
              ...prevState,
              ropa: e.target.value,
            }));
            changeTexture(e.target.value, "Cube003");
          }}
        >
         <option value="dfd2.png">Argentina</option>
        <option value="dfd3.png">River</option>
        <option value="dfd4.png">Boca</option>
        <option value="dfd5.png">Punisher</option>
        <option value="dfd6.png">Trajecito</option>
        <option value="dfd18.png">Nirvana</option>
        <option value="dfd19.png">Barbie</option>
        <option value="dfd20.png">Scarface</option>
        <option value="nada">Nada</option>
        </select>
        </div>


<div>
<p className="text-[#fac81c]">Color</p>
        <select
          value={selectedValueEdit.color}
          className="neon-border-ver"
          onChange={(e) => {
            setselectedValueEdit((prevState) => ({
              ...prevState,
              color: e.target.value,
            }));
            changeTexture(e.target.value, "Cube002");
          }}
        >
          <option value="dfd.png">Verde</option>
        <option value="dfd7.png">Violeta</option>
        <option value="dfd8.png">Deadpool</option>
        <option value="dfd9.png">Rorschach</option>
        <option value="dfd10.png">Naranja</option>
        <option value="dfd11.png">Rosa</option>
        <option value="dfd12.png">Spawn</option>
        <option value="dfd13.png">Pikachu</option>
        <option value="dfd14.png">Joker</option>
        <option value="dfd15.png">Sans</option>
        <option value="dfd16.png">Eva-01</option>
        <option value="dfd17.png">Luna</option>
        </select>
        </div>


        <button className="neon-border-crear p-4 mt-10" onClick={EditedArray}>editar</button>
        <p>{errorMessageedit}</p>
        </div>
       

       
      </div>
    );
  }
}
