"use client";
import { useState } from "react";
import Models from "../components/models";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [selectedValue, setSelectedValue] = useState('nada');

  const modelsData = [
    { name: 'Model 1', path: '/3d/gatoosfgfg.glb' },
    { name: 'Model 1', path: '/3d/gatoosfgfg copy.glb' },
   
   
  
  ];

  const handleChange = (event) => {
    const textureName = event.target.value;
    setSelectedValue(textureName);
  };

  return (
    <main className={`h-full w-full bg-white ${loading && 'absolute'}`}>
     
        <div className="controls absolute">
        
<div className="flex justify-center space-x-10">
          <Models modelsData={modelsData} textureName={selectedValue} />
          </div>
        </div>
      
    </main>
  );
}

