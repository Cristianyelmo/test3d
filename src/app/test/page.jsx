"use client"
import { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';

function Model({ textureName, modelPath }) {
  const modelRef = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  const [texture, setTexture] = useState(() => new TextureLoader().load(textureName));

  useFrame((state) => {
    modelRef.current.rotation.y += 0.01;
  });

  const handleChangeTexture = (newTexture) => {
    const loadedTexture = new TextureLoader().load(newTexture);
    setTexture(loadedTexture);
  };

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={6}
      onClick={() => handleChangeTexture('/texture/anotherTexture.png')}
    >
      {gltf.scene.traverse((node) => {
        if (node.isMesh) {
          node.material.map = texture;
        }
      })}
    </primitive>
  );
}

export default function Homexd() {
  return (
    
    <Canvas>
      <ambientLight intensity={0.5} />
      <Model textureName="/texture/initialTexture.png" modelPath="/3d/gatoosfgfg.glb" />
      <OrbitControls />
    </Canvas>

   
  );
}
