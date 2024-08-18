"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { MichiHook } from "../context/HomessContext";

export default function Modelss({texture}) {
  const {modelRef2,glbRef2,mixersRef} = MichiHook() 
  const modelRef = useRef(null);
 /*  const mixersRef = useRef([]); */
  const glbRef = useRef(null);
  const clock = useRef(new THREE.Clock());
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const containerRef = useRef(null); // Nuevo ref para el contenedor

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 800);
    const renderer = new THREE.WebGLRenderer();

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);
   
    container.appendChild(renderer.domElement); // Agrega el canvas al contenedor

    camera.position.set(0, 20, 50);

    const loader = new GLTFLoader();
    loader.load(
      '/3d/gatoosfgfg.glb',
      function (gltf) {
        const model = gltf.scene;
        model.scale.set(10, 10, 10);
        modelRef.current = model;
        modelRef2.current = model
        glbRef.current = gltf;
        glbRef2.current = gltf;


        
{
  texture.map((textureName) => {
    const tex = new THREE.TextureLoader().load(`/texture/${textureName.name}`);
    console.log(tex);
    tex.flipY = false;
  
    modelRef.current.traverse((node) => {
      if (node.isMesh && node.name == textureName.cube) {
        if(textureName.cube == 'Cube001'){
          node.material.transparent = true;
        node.material.opacity = 0.9;
        node.material.alphaTest = 0.1;
        node.material.needsUpdate = true;
        }

        if(textureName.name == 'nada'){
          node.visible = false;
        }else{
          node.material.map = tex;
        }


        
        
      }
    });
  });
}
       

        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientLight);
        scene.add(model);

        setLoading(false);
      },
      function (xhr) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        setLoadProgress(Math.round(percentComplete));
      },
      function (error) {
        console.error(error);
      }
    );

    function animate() {
      const delta = clock.current.getDelta();
      mixersRef.current.forEach(mixer => mixer.update(delta));
      if (modelRef.current && glbRef.current) {
        modelRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  const move3d = () => {
    if (modelRef.current && glbRef.current) {
      const mixer = new THREE.AnimationMixer(modelRef.current);
      glbRef.current.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
      mixersRef.current.push(mixer);
    }
  };


 

  return (
    <div className="border-[3px] border-[#00FF00] ">
      <div ref={containerRef} className="w-[200px] h-[200px] "> {/* Contenedor para el canvas */}

        {/* Aquí se montará el canvas de Three.js */}
      </div>
      </div>
    
    
  );
}

