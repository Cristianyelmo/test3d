"use client";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import Modelss from "../Modelss";
import { MichiHook } from "../../context/HomessContext";

export default function EditedCats() {
  const {
    find,
    setFind,
    getid,
    setLoadingEdited,
    changeTexture,
    setChangepage,
    gatos,
    setGatos,
    mixersRef,
    modelRef2,
    glbRef2,
    loadingedited,
  } = MichiHook();
  useEffect(() => {
    const fetchData = async () => {
      setLoadingEdited(false);

      try {
        const response = await fetch(`/api/GetMichis/${getid}`);
        if (!response.ok) {
          throw new Error("Document not found");
        }
        const result = await response.json();
        console.log("Resultado del fetch:", result);
        setFind(result);
      } catch (error) {
        console.error("Error al obtener el documento:", error);
      } finally {
        setTimeout(() => {
          setLoadingEdited(true);
        }, 1000);
      }
    };

    fetchData();
  }, [getid]);

  useEffect(() => {
    if (find && find.textura) {
      setSelectedValue({
        anteojos: find.textura[1].name || "",
        ropa: find.textura[2].name || "",
      });
      setSelectedValuetext(find.name);
    }
  }, [find]);

  const [selectedValue, setSelectedValue] = useState({
    anteojos: "",
    ropa: "",
  });
  const [selectedValuetext, setSelectedValuetext] = useState("");

  const move3d = () => {
    if (modelRef2.current && glbRef2.current) {
      /*  modelRef.current.rotation.x += 0.07; */

      const mixer = new THREE.AnimationMixer(modelRef2.current);
      glbRef2.current.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
      });

      mixersRef.current.push(mixer);
    }
  };

  const EditedArray = () => {
    const EditMichisObject = {
      name: selectedValuetext,
      color: "piel1.png",
      anteojos: selectedValue.anteojos,
      remera: selectedValue.ropa,
    };

    const updateMichi = async () => {
      try {
        const response = await fetch(`/api/EditMichis/${getid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(EditMichisObject),
        });

        if (!response.ok) {
          throw new Error("Failed to update the document");
        }

        const result = await response.json(); // Convierte la respuesta en JSON
        console.log("Document updated successfully:", result);
      } catch (error) {
        console.error("Error updating document:", error);
      }
    };

    updateMichi();

    move3d();

    setTimeout(() => {
      setChangepage("Cats");
    }, 3000);
  };

  if (!loadingedited) {
    return <div>esperee...</div>;
  } else {
    return (
      <div className="flex">
        <button onClick={() => setChangepage("Cats")}>volver</button>
        <select
          value={selectedValue.anteojos}
          onChange={(e) => {
            setSelectedValue((prevState) => ({
              ...prevState,
              anteojos: e.target.value,
            }));
            changeTexture(e.target.value, "Cube001");
          }}
        >
          <option value="anteojoos.png">Option 1</option>
          <option value="anteojoos2.png">Option 2</option>
          <option value="nada">Nada</option>
        </select>

        <select
          value={selectedValue.ropa}
          onChange={(e) => {
            setSelectedValue((prevState) => ({
              ...prevState,
              ropa: e.target.value,
            }));
            changeTexture(e.target.value, "Cube002");
          }}
        >
          <option value="remera1.png">Option 1</option>
          <option value="remera2.png">Option 2</option>
          <option value="nada">Nada</option>
        </select>

        <div className="animation-open">
          <Modelss texture={find.textura} editandcreate={true} />

          <input
            onChange={(e) => {
              setSelectedValuetext(e.target.value);
            }}
            type="text"
            value={selectedValuetext}
          />
        </div>

        <button onClick={EditedArray}>editar</button>
      </div>
    );
  }
}
