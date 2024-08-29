"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import Modelss from "../Modelss";
import { MichiHook } from "../../context/MichiContext";
import { MichiCreateAndEditedHook } from "@/app/context/MichiCreateAndEditedContext";
import Image from "next/image";

export default function CreateCats() {
 const 
  {
    CreatedArray,selectedValuetext, setSelectedValuetext,
    selectedValue,
    changeTexture,resetSelectedValue,handleUpdate,Volver,loadingcreate,setLoadingCreate
  }
  = MichiCreateAndEditedHook()

 const {changepage} = MichiHook()
  
 useEffect(() => {
  if (changepage == 'CreateCats') {
    
    setLoadingCreate(true)
    resetSelectedValue();
  }
}, [changepage]);

 
 
if(!loadingcreate){
  return <div className="bg-black text-white relative h-screen w-full  fondo-content">
  <div className="absolute inset-0 flex flex-col justify-center items-center">
<p className="hollow-neon-text text-3xl mb-4">cargando...</p>
<Image src="/texture/tte.png" width={128} height={128} alt="Cargando" />
</div>
  </div>;
}else{

  
  

  return (
    <div className="flex fondo-content">
      <button onClick={Volver}>volver</button>
      <select
        value={selectedValue[0].name}
        onChange={(e) => {
          handleUpdate(e, "Cube002");
          changeTexture(e.target.value, "Cube002");
        }}
      >
        <option value="dfd.png">Option 1</option>
        <option value="dfd7.png">Option 2</option>
        <option value="dfd8.png">Option 2</option>
        <option value="dfd9.png">Option 2</option>
        <option value="dfd10.png">Option 2</option>
        <option value="dfd11.png">Option 2</option>
        <option value="dfd12.png">Option 2</option>
        <option value="dfd13.png">Option 2</option>
        <option value="dfd14.png">Option 2</option>
        <option value="dfd15.png">Option 2</option>
        <option value="dfd16.png">Option 2</option>
        <option value="dfd17.png">Option 2</option>
      </select>




      <select
        value={selectedValue[1].name}
        onChange={(e) => {
          handleUpdate(e, "Cube001");
          changeTexture(e.target.value, "Cube001");
        }}
      >
        <option value="Proyecto nuevocvc.png">Option 1</option>
        <option value="Proyecto nuevocvc1.png">Option 2</option>
        <option value="Proyecto nuevocvc2.png">Option 2</option>
        <option value="Proyecto nuevocvc3.png">Option 2</option>
        <option value="Proyecto nuevocvc4.png">Option 2</option>
        <option value="Proyecto nuevocvc5.png">Option 2</option>
        <option value="Proyecto nuevocvc6.png">Option 2</option>
        <option value="Proyecto nuevocvc7.png">Option 2</option>
        <option value="nada">Nada</option>
      </select>

      <select
        value={selectedValue[2].name}
        onChange={(e) => {
          handleUpdate(e, "Cube003");
          changeTexture(e.target.value, "Cube003");
        }}
      >
        <option value="dfd2.png">Argentina</option>
        <option value="dfd3.png">River</option>
        <option value="dfd4.png">Boca</option>
        <option value="dfd5.png">Punisher</option>
        <option value="dfd6.png">Trajecito</option>
        <option value="dfd18.png">Trajecito</option>
        <option value="dfd19.png">Trajecito</option>
        <option value="dfd20.png">Trajecito</option>
        <option value="nada">Nada</option>
      </select>

      <div>
        <Modelss  texture={selectedValue} editandcreate={true} />

        <input
          onChange={(e) => {
            setSelectedValuetext(e.target.value);
          }}
          type="text"
          value={selectedValuetext}
        />
      </div>

      <button onClick={CreatedArray}>crear</button>
    </div>
  );
}
}
