"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import Modelss from "../Modelss";
import { MichiHook } from "../../context/MichiContext";
import { GetIdMichi, UptadeMichi } from "@/app/services/Crud.service";
import { MichiCreateAndEditedHook } from "@/app/context/MichiCreateAndEditedContext";

export default function EditedCats() {
  const {
    find,
    getid,
    loadingedited
  } = MichiHook();

  const {changeTexture,GetidMichi,Volver,selectedValueEdit, setselectedValueEdit,
    selectedValueEdittext, setselectedValueEdittext,EditedArray} = MichiCreateAndEditedHook()
  useEffect(() => {
    

    GetidMichi(getid);
  }, [getid]);

  useEffect(() => {
    if (find && find.textura) {
      setselectedValueEdit({
        anteojos: find.textura[1].name || "",
        ropa: find.textura[2].name || "",
        puntaje:find.puntaje
      });
      setselectedValueEdittext(find.name);
    }
  }, [find]);

 

  



  if (!loadingedited) {
    return <div>esperee...</div>;
  } else {
    return (
      <div className="flex">
        <button onClick={Volver}>volver</button>
        <select
          value={selectedValueEdit.anteojos}
          onChange={(e) => {
            setselectedValueEdit((prevState) => ({
              ...prevState,
              anteojos: e.target.value,
            }));
            changeTexture(e.target.value, "Cube001");
          }}
        >
          <option value="anteojoos.png">Option 1</option>
          <option value="anteojoos2.png">Option 2</option>
          <option value="nada">Nada</option>
        </select>

        <select
          value={selectedValueEdit.ropa}
          onChange={(e) => {
            setselectedValueEdit((prevState) => ({
              ...prevState,
              ropa: e.target.value,
            }));
            changeTexture(e.target.value, "Cube002");
          }}
        >
          <option value="remera1.png">Option 1</option>
          <option value="remera2.png">Option 2</option>
          <option value="nada">Nada</option>
        </select>

        <div className="animation-open">
          <Modelss texture={find.textura} editandcreate={true} />

          <input
            onChange={(e) => {
              setselectedValueEdittext(e.target.value);
            }}
            type="text"
            value={selectedValueEdittext}
          />
        </div>

        <button onClick={EditedArray}>editar</button>
      </div>
    );
  }
}
