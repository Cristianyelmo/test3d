"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import Modelss from "../Modelss";
import { MichiHook } from "../../context/HomessContext";

export default function EditedCats() {
const {find,changeTexture,setChangepage,gatos,setGatos,mixersRef,modelRef2,glbRef2}= MichiHook()
const [selectedValue, setSelectedValue] = useState({
  anteojos:find.textura[1].name,
  ropa:find.textura[2].name
});
const [selectedValuetext,setSelectedValuetext]= useState(find.name)
useEffect(() => {
  if (find && find.textura) {
    setSelectedValue(
      {
        anteojos:find.textura[1].name || '' ,
        ropa:find.textura[2].name || ''
      }
    )
  }
}, [find]);

const move3d = () => {
  if (modelRef2.current && glbRef2.current) {
   /*  modelRef.current.rotation.x += 0.07; */

    const mixer = new THREE.AnimationMixer(modelRef2.current);
    glbRef2.current.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
      action.timeScale = 0.1; 
    });

    mixersRef.current.push(mixer); 
    
}
}

const EditedArray = () => {

  const refreshedArray = gatos.map((gato) => {
    if (gato.id == find.id) {
      return {
        ...gato,
        name:selectedValuetext,
        textura: [
          {
            name: "piel2.png",
            cube: "Cube",
          },
          {
            name: selectedValue.anteojos,
            cube: "Cube001",
          },
          {
            name: selectedValue.ropa,
            cube: "Cube002",
          },
        ]
      };
    } else {
      return gato; 
    }
  });

  setGatos(refreshedArray)
  move3d()

setTimeout(() => {
  setChangepage('Cats')
}, 3000);
 


};




   return (
   
<div className="flex">
<button onClick={()=>setChangepage('Cats')}>volver</button>
<select 
 
    value={selectedValue.anteojos} 
    onChange={(e) => {
      setSelectedValue(prevState => ({
        ...prevState, 
        anteojos: e.target.value
      })) // Actualiza el valor seleccionado
      changeTexture(e.target.value,'Cube001'); 
    }}
  >
    <option value="anteojoos.png">Option 1</option>
    <option value="anteojoos2.png">Option 2</option>
    <option value="nada">Nada</option>
  </select>


   <select 
 
    value={selectedValue.ropa} 
    onChange={(e) => {
      setSelectedValue(prevState => ({
        ...prevState, 
        ropa: e.target.value
      })) 
      changeTexture(e.target.value,'Cube002'); 
    }}
  >
    <option value="remera1.png">Option 1</option>
    <option value="remera2.png">Option 2</option>
    <option value="nada">Nada</option>
  </select> 
      
     
            <div >
            <Modelss texture={find.textura}/>
            
        <input onChange={(e) => {
      setSelectedValuetext(e.target.value)
    }} type="text" value={selectedValuetext} />
          </div>
           

       
           <button onClick={EditedArray}>editar</button>
    
   
   </div>
 
  );  
}