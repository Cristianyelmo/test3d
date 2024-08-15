"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

export default function Home() {
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
  
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 800);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.set(0, 20, 50);

    const loader = new GLTFLoader();
    loader.load(
      '/3d/gatoosfgfg.glb',
      function (gltf) {
        const model = gltf.scene;
        model.scale.set(6, 6, 6);
        modelRef.current = model;
        glbRef.current = gltf;

        /*  modelRef.current.traverse((child) => {
          if (child.isMesh  && child.name === 'Cube001' ) {
         
            console.log(child.name)
            child.visible = false;
          }
        });  */


         modelRef.current.traverse((child) => {
          if (child.isMesh && child.name == 'Cube001') {
       
             child.material.transparent = true; 
            child.material.opacity = 0.9; 
            child.material.alphaTest = 0.1; 
    
           
          
          }
        }); 

     
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


   

   /*  const planeGeometry = new THREE.PlaneGeometry(500, 500);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = - Math.PI / 2;
    scene.add(plane); */

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
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  const move3d = () => {
    if (modelRef.current && glbRef.current) {
     /*  modelRef.current.rotation.x += 0.07; */

      const mixer = new THREE.AnimationMixer(modelRef.current);
      glbRef.current.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });

      mixersRef.current.push(mixer); 


      /* modelRef.current.traverse((child) => {
        if (child.isMesh  && child.name === 'Cube001' ) {
       
          console.log(child.name)
          child.visible = true;
        }
      }); */

     /*  modelRef.current.traverse((child) => {
        if (child.isMesh && child.name === 'Shirt') {
          modelRef.current.remove(child);
        }
      }); */
    }


/* 
     modelRef.current.traverse((child) => {
      if (child.isMesh) {
        // Set transparency settings
        child.material.transparent = true; // Enable transparency
        child.material.opacity = 0.5; // Set desired opacity
        child.material.alphaTest = 0.1; // Optional: adjust if needed

        // Remove specific mesh if needed
        if (child.name === 'Shirt') {
          modelRef.current.remove(child);
        }
      }
    }); */


   
  




















    
  }

  const changeTexture = (hola,cube) => {


    if(hola == 'nada'){
      modelRef.current.traverse((child) => {
        if (child.isMesh  && child.name == cube ) {
       
          console.log(child.name)
          child.visible = false;
        }
      }); 
    }else{
      modelRef.current.traverse((child) => {
        if (child.isMesh  && child.name == cube ) {
       
          console.log(child.name)
          child.visible = true;
        }

         const tex = new THREE.TextureLoader().load(`/texture/${hola}`);
    console.log(tex)
    tex.flipY = false;
    modelRef.current.traverse((node) => {
    
            if (node.isMesh && node.name == cube) {
        node.material.map = tex;
      }
    });
      });  
    }
 
   
  }
  const [selectedValue, setSelectedValue] = useState('nada');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    /* console.log(event.target.value); */
  
    // Carga la textura seleccionada
    const tex2 = new THREE.TextureLoader().load(`/texture/${event.target.value}`);
    console.log(`/texture/${event.target.value}`)
    // Aplica la textura al modelo
    modelRef.current.traverse((node) => {
      if (node.isMesh && node.name == 'Cube001') {
       
   
        node.material.map = tex2;
        node.material.needsUpdate = true; // Asegura que el material se actualice
      }
    });
  };
  return (
    <main className={`h-full w-full bg-white ${loading && 'absolute'} `}>
  
 {  loading ?   ( <div className="loader h-full w-full z-50 absolute ">
          Cargando... 
        </div>): (
        <div className="controls absolute">
          <button className="text-black bg-white m-10 p-4 rounded-lg" onClick={move3d}>
            Rotar y animar
          </button>
          <button className="text-black bg-white m-10 p-4 rounded-lg" onClick={()=>changeTexture('anteojoos.png','Cube001')}>
            Cambiar textura
      
          </button>
          <select 
    value={selectedValue} 
    onChange={(e) => {
      setSelectedValue(e.target.value); // Actualiza el valor seleccionado
      changeTexture(e.target.value, 'Cube001'); // Cambia la textura basada en la selección
    }}
  >
    <option value="anteojoos.png">Option 1</option>
    <option value="anteojoos2.png">Option 2</option>
    <option value="nada">Nada</option>
  </select>
        </div>

      
      )}
    
    </main>
  );
}
