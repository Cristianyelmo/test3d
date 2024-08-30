"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MichiCreateAndEditedHook } from "../context/MichiCreateAndEditedContext";

export default function Modelss({ texture, editandcreate, orbitControls }) {
  const { modelRef2, glbRef2, mixersRef } = MichiCreateAndEditedHook();
  const modelRef = useRef(null);
  const clock = useRef(new THREE.Clock());
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 800);
      const renderer = new THREE.WebGLRenderer();
      
      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);

      container.appendChild(renderer.domElement);

      camera.position.set(0, 20, window.innerWidth < 768 ? 100 : 50);

      const loader = new GLTFLoader();
      loader.load(
        "/3d/chavo.glb",
        function (gltf) {
          const model = gltf.scene;
          model.scale.set(10, 10, 10);
          modelRef.current = model;
          modelRef2.current = model;
          glbRef2.current = gltf;

          texture.forEach((textureName) => {
            const tex = new THREE.TextureLoader().load(`/texture/${textureName.name}`);
            tex.flipY = false;

            model.traverse((node) => {
              if (node.isMesh && node.name === textureName.cube) {
                if (textureName.name === "nada") {
                  node.visible = false;
                } else {
                  node.material.map = tex;
                  node.material.needsUpdate = true;
                }
              }
            });
          });

          scene.add(new THREE.AmbientLight(0xffffff, 2));
          scene.add(model);
          setLoading(false);
        },
        function (xhr) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        },
        function (error) {
          console.error(error);
        }
      );

      if (orbitControls) {
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.9;
      }

      function animate() {
        const delta = clock.current.getDelta();
        mixersRef.current.forEach((mixer) => mixer.update(delta));

        if (modelRef.current) {
          modelRef.current.rotation.y += 0.01;
        }
        renderer.render(scene, camera);
      }

      renderer.setAnimationLoop(animate);

      return () => {
        renderer.setAnimationLoop(null);
        container.removeChild(renderer.domElement);
        renderer.dispose(); // Limpiar recursos
      };
    }
  }, [texture]);

  return (
    <div className={`neon-border`}>
      <div ref={containerRef} className={`w-[300px] h-[300px]`}></div>
    </div>
  );
}
