"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import { MichiHook } from "../context/MichiContext";
import Image from "next/image";


export default function Presentation() {
   const {changePagePresentation,setChangePagePresentation} =  MichiHook()
  const modelRef = useRef(null);
  const mixersRef = useRef([]);
  const glbRef = useRef(null);
  const clock = useRef(new THREE.Clock());
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [animation, setAnimation] = useState('dfd');
  const containerRef = useRef(null);
 /*   useEffect(() => {
    const interval = setInterval(() => {
      setAnimation(prevAnimation => (prevAnimation === 'dfd' ? 'dfd-2' : 'dfd'));
    }, 500);

    return () => clearInterval(interval);
  }, []); 
  useEffect(() => {
    const tex = new THREE.TextureLoader().load(`/texture/${animation}.png`);
    tex.flipY = false;

    if (modelRef.current) {
      modelRef.current.traverse((node) => {
        if (node.isMesh && node.name == 'Cube005') {
          node.material.map = tex;
        }
      });
    }
  }, [animation]);  */
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
   /*  renderer.setSize(window.innerWidth, window.innerHeight); */
   /*  document.body.appendChild(renderer.domElement); */
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);

    container.appendChild(renderer.domElement);
    camera.position.set(0, 50, 70);






   












    const loader = new GLTFLoader();
    loader.load(
      '/3d/testpresentation.glb',
      function (gltf) {
        const model = gltf.scene;
        model.scale.set(6.5, 6.5, 6.5);
        modelRef.current = model;
        glbRef.current = gltf;


        const textureLoader = new THREE.TextureLoader();
textureLoader.load('/texture/Untitled.jpeg', function(texture) {
  scene.background = texture;
});


const arrayObjectTexture = [
  {
    image:'xd7.png',
    cube:'Cube004'
  },
  {
    image:'luzperro.png',
    cube:'Cube016'
  },
  {
    image:'michi.png',
    cube:'Cube017'
  }
  
]
arrayObjectTexture.map((item)=>{
const tex = new THREE.TextureLoader().load(
 
  `/texture/${item.image}`
);

tex.flipY = false;
modelRef.current.traverse((node) => {
  if (node.isMesh && node.name == item.cube) {
   
      node.material.transparent = true;
      node.material.opacity = 0.9;
      node.material.alphaTest = 0.1;
    
    

    
      node.material.map = tex;
    
  }
});

})  

     
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
      container.removeChild(renderer.domElement);
    };
  }, []);






 

  return (
    <div   ref={containerRef} className="relative overflow-hidden h-screen w-full">
<div className={`bg-black z-30 h-full w-full absolute opacity-0 ${presentationanimation}`}>



</div>
{/* <Image src="/texture/sss.png" className=" absolute h-[600px] bottom-[0px]  lg:bottom-[-100px] left-1/2 transform -translate-x-1/2 mb-4  opacity-0 presentation-new2" height={1280} width={720}/> */}
<h1 className="neon-text z-10 absolute text-4xl lg:text-5xl lg:top-[450px]  h-[600px] bottom-[-320px]  bottom-0 left-1/2 transform -translate-x-1/2 mb-4  presentation-new2 ">PetMaker</h1>
   {/*  <main className={`h-full w-full bg-white ${loading && 'absolute'} `}>

  
 {  loading ?   ( <div className="loader h-full w-full z-50 absolute ">
          Cargando... 
        </div>): (
        <div className="controls absolute">
          
        </div>

      
      )}
    
    </main>  */}

    </div>
  );
}