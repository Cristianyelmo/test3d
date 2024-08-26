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
    getid,
  } = MichiHook();

  const {changeTexture,GetidMichix,Volver,selectedValueEdit, setselectedValueEdit,
    selectedValueEdittext, setselectedValueEdittext,EditedArray,loadingedited,find} = MichiCreateAndEditedHook()
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
          value={selectedValueEdit.ropa}
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
        <option value="dfd18.png">Trajecito</option>
        <option value="dfd19.png">Trajecito</option>
        <option value="dfd20.png">Trajecito</option>
        <option value="nada">Nada</option>
        </select>




        <select
          value={selectedValueEdit.color}
          onChange={(e) => {
            setselectedValueEdit((prevState) => ({
              ...prevState,
              color: e.target.value,
            }));
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
