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

  console.log(hola)
}

const ITEMS_PER_PAGE = 3; // Número de elementos por página



  const [currentPage, setCurrentPage] = useState(1);


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGatos = gatos.slice(startIndex, endIndex);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(currentGatos)
  };


  const totalPages = Math.ceil(gatos.length / ITEMS_PER_PAGE);






   return (
   
<div className="flex">

{viewModal && <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
     
        <div class="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 class="text-xl font-bold mb-4">quieres eliminar a {infoModal.name}</h2>
            <button class="bg-blue-500 text-white py-2 px-4 rounded" onClick={()=>gatosDelete(infoModal.id)}>Emilinar</button>
            <button class="bg-blue-500 text-white py-2 px-4 rounded" onClick={()=>setViewModal(false)}>Close</button>
        </div>
           




    </div>}
    <div className="flex flex-col">
      <div className="flex">
    {
        currentGatos.map((gato,index)=>(
     
            <div key={index} >
            <Modelss texture={gato.textura} editandcreate={false}/>
            <p>{gato.name}</p>
            <div className="space-x-2">
            <button onClick={()=>gatofind(gato.id)} className="bg-black text-white">editar</button>
            <button onClick={()=>gatoModal(gato.id)} className="bg-black text-white">eliminar</button>
            </div>
          </div>
           
        ))
    }
    </div>
     <button className="border-[1px] border-black" onClick={()=>setChangepage('CreateCats')}>crear</button>



     <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 p-2 ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      </div>
   </div>
  
 
  ); 
}
