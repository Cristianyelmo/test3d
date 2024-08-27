"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import Modelss from "./Modelss";
import { MichiHook } from "../context/MichiContext";
import Cats from "./view/Cats";
import EditedCats from "./view/EditedCats";
import CreateCats from "./view/CreateCats";

export default function Crud() {
const {changepage}= MichiHook()
const[presentacioncrud,setPresentacioncrud]=useState('')
useEffect(()=>{
  
  
  setTimeout(() => {
    setPresentacioncrud('hidden')
  }, 2000);
    },[])
   return (
    <div>
    <div className={`bg-black absolute z-30 inset-0 opacity-presentation2 ${presentacioncrud}`}></div>
    <main className={`bg-black`}>
<div className="mt-10 bg-black flex space-x-10">
{changepage == 'Cats' ? <Cats/> : changepage == 'EditedCats' ?  <EditedCats/> : changepage == 'CreateCats' && <CreateCats/>}
  </div>

    </main>
    </div>
  ); 
}