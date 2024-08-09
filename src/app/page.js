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

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 800);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.set(0, 20, 50);

    const loader = new GLTFLoader();
    loader.load(
      '/3d/untitlednew.glb',
      function (gltf) {
        const model = gltf.scene;
        model.scale.set(10, 10, 10);
        modelRef.current = model;
        glbRef.current = gltf;

        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientLight);
        scene.add(model);

        setLoading(false);
      },
      function (xhr) {
        // Actualiza el progreso de carga
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        setLoadProgress(Math.round(percentComplete));
      },
      function (error) {
        console.error(error);
      }
    );

    const planeGeometry = new THREE.PlaneGeometry(500, 500);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = - Math.PI / 2;
    scene.add(plane);

    function animate() {
      const delta = clock.current.getDelta();
      mixersRef.current.forEach(mixer => mixer.update(delta));
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  const move3d = () => {
    if (modelRef.current && glbRef.current) {
      modelRef.current.rotation.x += 0.07;

      const mixer = new THREE.AnimationMixer(modelRef.current);
      glbRef.current.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });

      mixersRef.current.push(mixer);

      modelRef.current.traverse((child) => {
        if (child.isMesh && child.name === 'Shirt') {
          modelRef.current.remove(child);
        }
      });
    }
  }

  const changeTexture = () => {
    const tex = new THREE.TextureLoader().load('/texture/Eggette_DIFF (2).png');
    tex.flipY = false;
    modelRef.current.traverse((node) => {
      if (node.isMesh) {
        node.material.map = tex;
      }
    });
  }

  return (
    <main className={`h-full w-full bg-white ${loading && 'absolute'} `}>
  
 {  loading ?   ( <div className="loader h-full w-full z-50 absolute ">
          Cargando... 
        </div>): (
        <div className="controls absolute">
          <button className="text-black bg-white m-10 p-4 rounded-lg" onClick={move3d}>
            Rotar y animar
          </button>
          <button className="text-black bg-white m-10 p-4 rounded-lg" onClick={changeTexture}>
            Cambiar textura
          </button>
        </div>
      )}
    
    </main>
  );
}
