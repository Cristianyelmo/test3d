"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import Modelss from "../Modelss";
import { MichiHook } from "../../context/MichiContext";
import { MichiCreateAndEditedHook } from "@/app/context/MichiCreateAndEditedContext";

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
  return(
    <div>...espere</div>
  )
}else{

  
  

  return (
    <div className="flex">
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
        <option value="nada">Nada</option>
      </select>

      <div>
        <Modelss texture={selectedValue} editandcreate={true} />

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
