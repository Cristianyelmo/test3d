"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import Modelss from "../components/Modelss";
import { MichiHook } from "../context/HomessContext";
import Cats from "../components/view/Cats";
import EditedCats from "../components/view/EditedCats";
import CreateCats from "../components/view/CreateCats";

export default function crud() {
const {gatos,gatofind,changepage}= MichiHook()
const[presentacioncrud,setPresentacioncrud]=useState('')
useEffect(()=>{
  
  
  setTimeout(() => {
    setPresentacioncrud('hidden')
  }, 2000);
    },[])
   return (
    <div>
    <div className={`bg-black absolute z-30 inset-0 opacity-presentation2 ${presentacioncrud}`}></div>
    <main className={` bg-white h-screen `}>
<div className=" mt-10 bg-white flex space-x-10">
{changepage == 'Cats' ? <Cats/> : changepage == 'EditedCats' ?  <EditedCats/> : changepage == 'CreateCats' && <CreateCats/>}
  </div>

    </main>
    </div>
  ); 
}
