"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MichiCreateAndEditedHook } from "../context/MichiCreateAndEditedContext";

export default function Modelss({ texture, editandcreate, orbitControls }) {
  const { modelRef2, glbRef2, mixersRef } = MichiCreateAndEditedHook();
  const modelRef = useRef(null);
  const glbRef = useRef(null);
  const clock = useRef(new THREE.Clock());
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      800
    );
    const renderer = new THREE.WebGLRenderer();
    const container = containerRef.current;

    // Set clear color with alpha
    const color = new THREE.Color(0x41117e);
    const alpha = 0.6;
    renderer.setClearColor(color, alpha);

    // Set renderer size
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      "/3d/chavo.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(10, 10, 10);
        modelRef.current = model;
        modelRef2.current = model;
        glbRef.current = gltf;
        glbRef2.current = gltf;

        // Apply textures
        texture.map((textureName) => {
          const tex = new THREE.TextureLoader().load(
            `/texture/${textureName.name}`
          );
          tex.flipY = false;
          modelRef.current.traverse((node) => {
            if (node.isMesh && node.name === textureName.cube) {
              if (textureName.cube === "Cube001") {
                node.material.transparent = true;
                node.material.opacity = 0.9;
                node.material.alphaTest = 0.1;
                node.material.needsUpdate = true;
              }
              if (textureName.name !== "nada") {
                node.material.map = tex;
              } else {
                node.visible = false;
              }
            }
          });
        });

        // Setup OrbitControls
        if (orbitControls) {
          const controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.9;
        }

        // Add light
        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientLight);
        scene.add(model);

        setLoading(false);
      },
      (xhr) => {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        setLoadProgress(Math.round(percentComplete));
      },
      (error) => {
        console.error(error);
      }
    );

    function resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Update camera position based on window width
      if (width < 768) {
        camera.position.set(0, 20, 100);
      } else {
        camera.position.set(0, 20, 50);
      }
    }

    // Add resize event listener
    window.addEventListener('resize', resize);
    resize(); // Call resize initially

    function animate() {
      const delta = clock.current.getDelta();
      mixersRef.current.forEach((mixer) => mixer.update(delta));
      if (modelRef.current && glbRef.current) {
        modelRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    return () => {
      window.removeEventListener('resize', resize);
      renderer.setAnimationLoop(null);
      container.removeChild(renderer.domElement);
    };
  }, [texture, orbitControls, editandcreate]);

  return (
    <div className="neon-border">
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  );
}
