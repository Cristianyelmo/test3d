"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Crear la escena, cámara y renderizador
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);
      camera.position.z = 5;

      // Cargar el modelo GLTF
      const loader = new GLTFLoader();
      loader.load('/3d/nessa_low_poly.glb', (gltf) => {
        scene.add(gltf.scene);
        renderer.render(scene, camera); // Renderiza la escena una vez cargado el modelo
      }, undefined, (error) => {
        console.error('Error loading GLTF model:', error);
      });

      // Función de animación (opcional)
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      // Limpieza al desmontar el componente
      return () => {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      };
    }
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeScene;
