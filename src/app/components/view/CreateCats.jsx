"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import Modelss from "../Modelss";
import { MichiHook } from "../../context/MichiContext";
import { NewMichi } from "@/app/services/Crud.service";
import { MichiCreateAndEditedHook } from "@/app/context/MichiCreateAndEditedContext";

export default function CreateCats() {
 const 
  {
    move3d,CreatedArray,selectedValuetext, setSelectedValuetext,
    selectedValue,
    changeTexture,resetSelectedValue,handleUpdate,Volver
  }
  = MichiCreateAndEditedHook()

 const {changepage} = MichiHook()
  const[loadingcreate,setLoadingCreate]= useState(false)
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
        value={selectedValue[1].name}
        onChange={(e) => {
          handleUpdate(e, "Cube001");
          changeTexture(e.target.value, "Cube001");
        }}
      >
        <option value="anteojoos.png">Option 1</option>
        <option value="anteojoos2.png">Option 2</option>
        <option value="nada">Nada</option>
      </select>

      <select
        value={selectedValue[2].name}
        onChange={(e) => {
          handleUpdate(e, "Cube002");
          changeTexture(e.target.value, "Cube002");
        }}
      >
        <option value="remera1.png">Option 1</option>
        <option value="remera2.png">Option 2</option>
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
