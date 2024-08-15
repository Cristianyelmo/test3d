import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Model = ({ path }) => {
  const { scene } = useGLTF(path);

  scene.scale.set(6, 6, 6);
  scene.position.set(0, 0, 0);

  scene.traverse((child) => {
    if (child.isMesh) {
      if (child.name === 'Cube001') {
        child.visible = false;
        child.material.transparent = true;
        child.material.opacity = 0.9;
        child.material.alphaTest = 0.1;
      }
    }
  });

  return <primitive object={scene} />;
};

const Models = ({ modelsData }) => {
  return (
    <Canvas>
      <ambientLight intensity={2} />
      <OrbitControls />
      {modelsData.map((modelData, index) => (
        <Model key={index} path={modelData.path} />
      ))}
    </Canvas>
  );
};

export default Models;
