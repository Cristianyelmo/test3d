"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import Modelss from "../Modelss";
import { MichiHook } from "../../context/HomessContext";

export default function Cats() {
const {gatos,gatofind,setChangepage,setGatos}= MichiHook()
const [viewModal,setViewModal] = useState(false)
const [infoModal,setInfoModal] = useState(false)
const gatoModal = (id)=>{

  setViewModal(true)

  const hola = gatos.find((obj) => obj.id == id);
  setInfoModal(hola)

}

const gatosDelete = (id)=>{

  

  const hola = gatos.filter((obj) => obj.id !== id);
  setGatos(hola)
  setViewModal(false)
}








   return (
   
<div className="flex">

{viewModal && <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
     
        <div class="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 class="text-xl font-bold mb-4">quieres eliminar a {infoModal.name}</h2>
            <button class="bg-blue-500 text-white py-2 px-4 rounded" onClick={()=>gatosDelete(infoModal.id)}>Emilinar</button>
            <button class="bg-blue-500 text-white py-2 px-4 rounded" onClick={()=>setViewModal(false)}>Close</button>
        </div>
           




    </div>}
    {
        gatos.map((gato,index)=>(
     
            <div key={index}>
            <Modelss texture={gato.textura}/>
            <p>{gato.name}</p>
            <div className="space-x-2">
            <button onClick={()=>gatofind(gato.id)} className="bg-black text-white">editar</button>
            <button onClick={()=>gatoModal(gato.id)} className="bg-black text-white">eliminar</button>
            </div>
          </div>
           
        ))
    }
     <button className="border-[1px] border-black" onClick={()=>setChangepage('CreateCats')}>crear</button>
   </div>
  
 
  ); 
}
