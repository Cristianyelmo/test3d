"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import Modelss from "../components/Modelss";

export default function testing() {
  const gatos =[
{name:'cristian'},
{name:'cristian2'},
{name:'cristian3'},
{name:'cristian'},
{name:'cristian2'},
{name:'cristian3'}
]

   return (
    <main className={` bg-white h-screen `}>
<div className="  mt-10 bg-white flex   ">
    {
        gatos.map((gato,index)=>(
            <div key={index}>
            <Modelss/>
            <p>{gato.name}</p>
          </div>
        ))
    }
   

  </div>
    </main>
  ); 
}
