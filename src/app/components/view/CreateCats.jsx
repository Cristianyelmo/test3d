"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import Modelss from "../Modelss";
import { MichiHook } from "../../context/HomessContext";

export default function EditedCats() {
const {find,changeTexture,setChangepage,gatos,setGatos,mixersRef,modelRef2,glbRef2}= MichiHook()
const [selectedValuetext,setSelectedValuetext]= useState('')
const [selectedValue, setSelectedValue] = useState([
  {
    name: "piel3.png",
    cube: "Cube",
  },
  {
    name: "nada",
    cube: "Cube001",
  },
  
  {
    name: "nada",
    cube: "Cube002",
  },
],);



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

const CreatedArray = () => {

  const newObject =  {
    id: 5,
    name:selectedValuetext,
    textura: selectedValue
  }
  setGatos(prevItems => [...prevItems,newObject]);
  move3d()

setTimeout(() => {
  setChangepage('Cats')
}, 3000);
  }
 




const handleUpdate = (e,cubex) => {
  const newValue = e.target.value; 
  const targetCube = cubex;

  setSelectedValue(prevState =>
    prevState.map(item =>
      item.cube == targetCube
        ? { ...item, name: newValue } 
        : item 
    )
  );
};





   return (
   
<div className="flex">
<button onClick={()=>setChangepage('Cats')}>volver</button>
<select 
 
    value={selectedValue[1].name} 
    onChange={(e) => {
      handleUpdate(e,'Cube001')
      changeTexture(e.target.value,'Cube001'); 
    }}
  >
    <option value="anteojoos.png">Option 1</option>
    <option value="anteojoos2.png">Option 2</option>
    <option value="nada">Nada</option>
  </select>


   <select 
 
 value={selectedValue[2].name}
    onChange={(e) => {
      handleUpdate(e,'Cube002')
      changeTexture(e.target.value,'Cube002'); 
    }}
  >
    <option value="remera1.png">Option 1</option>
    <option value="remera2.png">Option 2</option>
    <option value="nada">Nada</option>
  </select> 
      
     
            <div >
            <Modelss texture={selectedValue}/>
            <p>{find.name}</p>
            <input onChange={(e) => {
      setSelectedValuetext(e.target.value)
    }} type="text" value={selectedValuetext} />
          </div>
           

       
           <button onClick={CreatedArray}>crear</button>
    
   
   </div>
 
  );  
}