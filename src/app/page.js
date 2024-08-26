"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';


import { MichiHook } from "./context/MichiContext";
import Crud from "./components/Crud";
import Presentation from "./components/Presentation";
export default function Home() {
 
  const { changePagePresentation } = MichiHook()


 
  return (
    <div>
       {/*   {  changePagePresentation ? */} <Presentation/> {/*  : <Crud/>}  */}
   </div>
 
  )

 
}