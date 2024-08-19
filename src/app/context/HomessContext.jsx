// context/HomeContext.js
"use client";
import { createContext, useContext, useState, useRef } from "react";
import * as THREE from "three";
export const MichiContext = createContext(null);

export const MichiHook = () => {
  return useContext(MichiContext);
};

export const MichiProvider = ({ children }) => {
  const [gatos,setGatos] = useState( [
    {
      id: 1,
      name: "cristian",
      textura: [
        {
          name: "piel1.png",
          cube: "Cube",
        },
        {
          name: "nada",
          cube: "Cube001",
        },
        {
          name: "remera3.png",
          cube: "Cube002",
        }
      ]
    },
    {
      id: 2,
      name: "cristian2",
      textura: [
        {
          name: "piel2.png",
          cube: "Cube",
        },
        {
          name: "anteojoos2.png",
          cube: "Cube001",
        },
        
        {
          name: "remera1.png",
          cube: "Cube002",
        }
      ]
    },
    {
      id: 3,
      name: "cristian3",
      textura: [
        {
          name: "piel2.png",
          cube: "Cube",
        },
        {
          name: "nada",
          cube: "Cube001",
        },
        {
          name: "remera2.png",
          cube: "Cube002",
        },
      ],
    
    },
    {
      id: 4,
      name: "cristian",
      textura: [
        {
          name: "piel3.png",
          cube: "Cube",
        },
        {
          name: "anteojoos2.png",
          cube: "Cube001",
        },

        {
          name: "remera1.png",
          cube: "Cube002",
        },
      ],
    
    },
    {
      id: 5,
      name: "cristian",
      textura: [
        {
          name: "piel1.png",
          cube: "Cube",
        },
        {
          name: "nada",
          cube: "Cube001",
        },
        {
          name: "remera3.png",
          cube: "Cube002",
        }
      ]
    },
    {
      id: 6,
      name: "cristian2",
      textura: [
        {
          name: "piel2.png",
          cube: "Cube",
        },
        {
          name: "anteojoos2.png",
          cube: "Cube001",
        },
        
        {
          name: "remera1.png",
          cube: "Cube002",
        }
      ]
    },
    {
      id: 7,
      name: "cristian3",
      textura: [
        {
          name: "piel2.png",
          cube: "Cube",
        },
        {
          name: "nada",
          cube: "Cube001",
        },
        {
          name: "remera2.png",
          cube: "Cube002",
        },
      ],
    
    },
    {
      id: 8,
      name: "cristian",
      textura: [
        {
          name: "piel3.png",
          cube: "Cube",
        },
        {
          name: "anteojoos2.png",
          cube: "Cube001",
        },

        {
          name: "remera1.png",
          cube: "Cube002",
        },
      ],
    
    },
  ])

  const [find, setFind] = useState({});
  const [changepage, setChangepage] = useState("Cats");

  const gatofind = (gatoxd) => {
    const hola = gatos.find((obj) => obj.id == gatoxd);
    console.log(hola);
    setFind(hola);
    setChangepage("EditedCats");
  };
  const modelRef2 = useRef(null);
  const glbRef2 = useRef(null);
  const mixersRef = useRef([]);
  const changeTexture = (hola, cube) => {
    if (hola == "nada") {
      modelRef2.current.traverse((child) => {
        if (child.isMesh && child.name == cube) {
          console.log(child.name);
          child.visible = false;
        }
      });
    } else {
      const tex = new THREE.TextureLoader().load(`/texture/${hola}`);
      console.log(tex);
      tex.flipY = false;
      modelRef2.current.traverse((node) => {
        console.log(node.name);
        if (node.isMesh && node.name == cube) {
          node.visible = true;
          node.material.map = tex;
          node.material.transparent = true;
          node.material.opacity = 0.9;
          node.material.alphaTest = 0.1;
        }
      });

      /*    modelRef2.current.traverse((child) => {
                if (child.isMesh && child.name == cube) {
                  child.material.transparent = true;
                  child.material.opacity = 0.9;
                  child.material.alphaTest = 0.1;
                }
              }); */
    }
  };
  const [changePagePresentation,setChangePagePresentation]= useState(true)
  const otherRef = useRef(null);
  return (
    <MichiContext.Provider
      value={{
        mixersRef,
        gatos,
        gatofind,
        find,
        changepage,
        setChangepage,
        modelRef2,
        glbRef2,
        changeTexture,
        setGatos,
        changePagePresentation,setChangePagePresentation,
        otherRef
      }}
    >
      {children}
    </MichiContext.Provider>
  );
};
