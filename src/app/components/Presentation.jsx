"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import { MichiHook } from "../context/MichiContext";
export default function Presentation() {
   const {changePagePresentation,setChangePagePresentation} =  MichiHook()
  const modelRef = useRef(null);
  const mixersRef = useRef([]);
  const glbRef = useRef(null);
  const clock = useRef(new THREE.Clock());
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [animation, setAnimation] = useState(2);
  /* useEffect(() => {
    const interval = setInterval(() => {
      setAnimation(prevAnimation => (prevAnimation === 2 ? 3 : 2));
    }, 1000);

    return () => clearInterval(interval);
  }, []); */

  /* useEffect(() => {
    const tex = new THREE.TextureLoader().load(`/texture/Eggette_DIFF (${animation}).png`);
    tex.flipY = false;

    if (modelRef.current) {
      modelRef.current.traverse((node) => {
        if (node.isMesh) {
          node.material.map = tex;
        }
      });
    }
  }, [animation]); */
  const [presentationanimation,setPresentationanimation]= useState('')

  
  useEffect(()=>{
setTimeout(() => {
  setPresentationanimation('opacity-presentation')
}, 5000);

setTimeout(() => {
    setChangePagePresentation(false)
}, 8000);
  },[])


  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 800);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.set(0, 50, 70);

    const loader = new GLTFLoader();
    loader.load(
      '/3d/michimaker-spacewdss.glb',
      function (gltf) {
        const model = gltf.scene;
        model.scale.set(6.5, 6.5, 6.5);
        modelRef.current = model;
        glbRef.current = gltf;


        const textureLoader = new THREE.TextureLoader();
textureLoader.load('/texture/Untitled.jpeg', function(texture) {
  scene.background = texture;
});

      

     
        const ambientLight = new THREE.AmbientLight(0xffffff, 3);
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


   

   
    let moveCameraForward = true; 
    function animate() {

      if (moveCameraForward && camera.position.z > 55) {
        camera.position.z -= 0.1; // Ajusta la velocidad de la cámara
      } else {
        moveCameraForward = false; // Detén el movimiento de la cámara
      }
      const delta = clock.current.getDelta();
      mixersRef.current.forEach(mixer => mixer.update(delta));
   /*    if (modelRef.current && glbRef.current) {
        modelRef.current.rotation.y += 0.01;
      } */
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);






 

  return (

<div className={`bg-black h-full w-full absolute opacity-0 ${presentationanimation}`}></div>
   /*  <main className={`h-full w-full bg-white ${loading && 'absolute'} `}>
  
 {  loading ?   ( <div className="loader h-full w-full z-50 absolute ">
          Cargando... 
        </div>): (
        <div className="controls absolute">
          
        </div>

      
      )}
    
    </main> */
  );
}