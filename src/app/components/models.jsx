import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { GridHelper, AxesHelper } from 'three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
const Model = ({ path, textureName, position }) => {
  const { scene } = useGLTF(path);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      setModel(gltf.scene);
    });

    return () => {
      // Cleanup if needed
    };
  }, [path]);

  useEffect(() => {
    if (model) {
      model.scale.set(1, 1, 1); 
      model.position.set(position[0], position[1], position[2]);

      model.traverse((child) => {
        if (child.isMesh) {
          if (textureName !== 'nada') {
            const tex = new THREE.TextureLoader().load(`/texture/${textureName}`);
            tex.flipY = false;
            child.material.map = tex;
            child.material.needsUpdate = true;
          }
          child.material.transparent = true;
          child.material.opacity = 0.9;
          child.material.alphaTest = 0.1;
        }
      });
    }
  }, [model, textureName, position]);

  return model ? <primitive object={model} /> : null;
};

const Models = ({ modelsData, textureName }) => {
  const positions = [
    [0, 0, 0],   // First model
    [3, 0, 0],  // Second model
    [6, 0, 0],  // Third model
  ];

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={95} />
      <ambientLight intensity={2} />
      <OrbitControls />
     {/*  <primitive object={new GridHelper(50, 50)} />
      <primitive object={new AxesHelper(5)} /> */}
      {modelsData.map((modelData, index) => (
        <Model
          key={index}
          path={modelData.path}
          textureName={textureName}
          position={positions[index]}
        />
      ))}
    </Canvas>
  );
};

export default Models;


