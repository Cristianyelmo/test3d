"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import Models from "../components/models";

export default function Home() {
  const modelsRef = useRef([]);
  const mixersRef = useRef([]);
  const glbRef = useRef([]);
  const clock = useRef(new THREE.Clock());
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [animation, setAnimation] = useState(2);
  const [selectedValue, setSelectedValue] = useState('nada');

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 800);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.set(0, 20, 50);

    const modelsData = [
        { name: 'Model 1', path: '/3d/gatoosfgfg.glb' },
        { name: 'Model 2', path: '/3d/gatoosfgfg.glb' },
        { name: 'Model 2', path: '/3d/gatoosfgfg.glb' },
        
      ];
      
      modelsData.forEach((modelData, index) => {
        const loader = new GLTFLoader();
        loader.load(
          modelData.path,
          (gltf) => {
            const model = gltf.scene;
            model.scale.set(6, 6, 6);
            model.position.set(0,0,0);
      
            // Ensure models are added only once
            if (!modelsRef.current.includes(model)) {
              modelsRef.current.push(model);
              glbRef.current.push(gltf);
      
              model.traverse((child) => {
                if (child.isMesh) {
                  if (child.name === 'Cube001') {
                    child.visible = false;
                    child.material.transparent = true;
                    child.material.opacity = 0.9;
                    child.material.alphaTest = 0.1;
                  }
                }
              });
      
              const ambientLight = new THREE.AmbientLight(0xffffff, 2);
              scene.add(ambientLight);
              scene.add(model);
      
              setLoading(false);
            }
          },
          (xhr) => {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            setLoadProgress(Math.round(percentComplete));
          },
          (error) => {
            console.error(error);
          }
        );
      });
      

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
    modelsRef.current.forEach((model, index) => {
      if (model && glbRef.current[index]) {
        const mixer = new THREE.AnimationMixer(model);
        glbRef.current[index].animations.forEach((clip) => {
          mixer.clipAction(clip).play();
        });
        mixersRef.current.push(mixer);
      }
    });
  };

  const changeTexture = (textureName, cubeName) => {
    modelsRef.current.forEach((model) => {
      model.traverse((child) => {
        if (child.isMesh && child.name === cubeName) {
          if (textureName === 'nada') {
            child.visible = false;
          } else {
            child.visible = true;
            const tex = new THREE.TextureLoader().load(`/texture/${textureName}`);
            tex.flipY = false;
            child.material.map = tex;
            child.material.needsUpdate = true;
          }
        }
      });
    });
  };

  const handleChange = (event) => {
    const textureName = event.target.value;
    setSelectedValue(textureName);
    changeTexture(textureName, 'Cube001');
  };

  return (
    <main className={`h-full w-full bg-white ${loading && 'absolute'}`}>
      {loading ? (
        <div className="loader h-full w-full z-50 absolute">
          Cargando...
        </div>
      ) : (
        <div className="controls absolute">
          <button className="text-black bg-white m-10 p-4 rounded-lg" onClick={move3d}>
            Rotar y animar
          </button>
          <button className="text-black bg-white m-10 p-4 rounded-lg" onClick={() => changeTexture('anteojoos.png', 'Cube001')}>
            Cambiar textura
          </button>
          <select value={selectedValue} onChange={handleChange}>
            <option value="anteojoos.png">Option 1</option>
            <option value="anteojoos2.png">Option 2</option>
            <option value="nada">Nada</option>
          </select>


        
        </div>
      )}
    </main>
  );
}
