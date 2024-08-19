"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import Modelss from "../Modelss";
import { MichiHook } from "../../context/HomessContext";

export default function Cats() {
const {gatos,gatofind,setChangepage,setGatos,modelRef2,glbRef2,mixersRef,otherRef}= MichiHook()
const [viewModal,setViewModal] = useState(false)
const [viewview,setViewview] = useState(false)
const [infoview,setInfoView] = useState(false)
const [infoModal,setInfoModal] = useState(false)
const[animationdelete,setAnimationdelete]=useState('')
const[idanimation,setIdAnimation]=useState(null)




const gatoModal = (id)=>{

  setViewModal(true)

  const hola = gatos.find((obj) => obj.id == id);
  setInfoModal(hola)

}


const gatoView = (id)=>{

  setViewview(true)

  const hola = gatos.find((obj) => obj.id == id);
  setInfoView(hola)

}

const gatosDelete = (id)=>{
setAnimationdelete('animation-delete') 
  setViewModal(false)

  setIdAnimation(id)
 move3d(id)
  setTimeout(() => {
    const nuevosGatos = gatos.filter((gato) => gato.id !== id);
    setGatos(nuevosGatos);

   
    const newTotalPages = Math.ceil(nuevosGatos.length / ITEMS_PER_PAGE);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  }, 1500);






}



const move3d = (index) => {

  /* if (otherRef.current) {
    // Selecciona el elemento con la clase dinámica
    const element = otherRef.current.querySelector(`.test-${index}`);

    if (element && modelRef2.current && glbRef2.current) {
      const mixer = new THREE.AnimationMixer(modelRef2.current);
      glbRef2.current.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
      });

      mixersRef.current.push(mixer); 
    }
  } */
}

const ITEMS_PER_PAGE = 3; 



  const [currentPage, setCurrentPage] = useState(1);


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGatos = gatos.slice(startIndex, endIndex);
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
   
  };


  const totalPages = Math.ceil(gatos.length / ITEMS_PER_PAGE);





 











   return (
   
<div className="flex">

{viewModal && <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
     
        <div class="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 class="text-xl font-bold mb-4">quieres eliminar a {infoModal.name}</h2>
            <button class="bg-blue-500 text-white py-2 px-4 rounded" onClick={()=>gatosDelete(infoModal.id)}>Emilinar</button>
            <button class="bg-blue-500 text-white py-2 px-4 rounded" onClick={()=>setViewModal(false)}>Close</button>
        </div>
           




    </div>}


    {viewview && <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
     
        <div class="bg-white p-6 rounded-lg shadow-lg w-80">
          <button onClick={()=> setViewview(false)} >cerrar</button>
        <Modelss texture={infoview.textura} editandcreate={false} orbitControls={true} />
        </div>
           




    </div> }


    <div className="flex flex-col">
      <div className="flex">
    {
        currentGatos.map((gato,index)=>(
     
            <div key={gato.id}  className={` ${idanimation == gato.id ? 'animation-delete' : 'animation-open'}`}
            
            >
            <Modelss texture={gato.textura} editandcreate={false} index={gato.id} />
            <p>{gato.name}</p>
            <div className="space-x-2">
            <button onClick={()=>gatofind(gato.id)} className="bg-black text-white p-2">editar</button>
            <button onClick={()=>gatoModal(gato.id)} className="bg-black text-white p-2">eliminar</button>
            <button onClick={()=>gatoView(gato.id)} className="bg-black text-white p-2">ver</button>
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
