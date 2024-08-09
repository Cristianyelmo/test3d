"use client";
import { useEffect, useRef } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

export default function Home() {
  const modelRef = useRef(null);
  const mixersRef = useRef([]); // Mantén esto como un array
  const glbRef = useRef(null);
  const clock = useRef(new THREE.Clock()); // Mueve el reloj fuera del useEffect

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 800);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.set(0, 20, 50);

    const loader = new GLTFLoader();
    loader.load('/3d/untitlednew.glb', function (gltf) {
      const model = gltf.scene;
      model.scale.set(10, 10, 10);
      modelRef.current = model;
      glbRef.current = gltf;

      const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Luz ambiental
      scene.add(ambientLight);
      scene.add(model);
    }, undefined, function (error) {
      console.error(error);
    });


    const planeGeometry = new THREE.PlaneGeometry(500, 500);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = - Math.PI / 2;
    scene.add(plane);

    function animate() {
      const delta = clock.current.getDelta();
      mixersRef.current.forEach(mixer => mixer.update(delta)); // Actualiza todos los mixers
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate); // Inicia el loop de animación

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  const move3d = () => {
    if (modelRef.current && glbRef.current) {
      modelRef.current.rotation.x += 0.07;

      // Crea un nuevo mixer y reproduce las animaciones
      const mixer = new THREE.AnimationMixer(modelRef.current);
      /* console.log(mixer)
      console.log(glbRef.current.animations)
      console.log(mixersRef) */
      glbRef.current.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });

      // Agrega el mixer al array de mixersRef
      mixersRef.current.push(mixer);
 
     /*  if (modelRef.current) { */
        modelRef.current.traverse((child) => {
           console.log(child) 
     /*  console.log(child.isMesh)
      console.log(child.name) */
         if (child.isMesh && child.name == 'SkinnedMesh') { // Cambia 'Shirt' por el nombre real del objeto
            modelRef.current.remove(child);
            console.log('holaaaa')
          }  
        });
    /*   } */
      // Aplica la textura si es necesario
  /*    var tex = new THREE.TextureLoader().load('/texture/Eggette_DIFF (2).png');
      tex.flipY = false;
      modelRef.current.traverse(function (node) {
        if (node.isMesh) {
          node.material.map = tex;
        }
      });  */
    }
  }
  const changetexture = ()=> {
    var tex = new THREE.TextureLoader().load('/texture/Eggette_DIFF (2).png');
      tex.flipY = false;
      modelRef.current.traverse(function (node) {
        if (node.isMesh) {
          node.material.map = tex;
        }
      });
  }
  
  return (
    <main className=" w-[20%] absolute flex min-h-screen m-4  flex-col items-center justify-between">
    
      <button className=" text-black bg-white m-10 p-4 rounded-lg" onClick={move3d}>
        holaaa
      </button>

      <button className="text-black bg-white m-10 p-4 rounded-lg" onClick={changetexture}>
        cambiar textura
      </button>
    </main>
  );
}
