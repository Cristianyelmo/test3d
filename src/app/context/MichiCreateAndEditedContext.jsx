// context/HomeContext.js
"use client";
import { createContext, useContext, useState, useRef } from "react";
import * as THREE from "three";
import {
  GetAllMichis,
  GetIdMichi,
  NewMichi,
  UptadeMichi,
} from "../services/Crud.service";
import { MichiHook } from "./MichiContext";

export const MichiCreateAndEditedContext = createContext(null);

export const MichiCreateAndEditedHook = () => {
  return useContext(MichiCreateAndEditedContext);
};

export const MichiCreateAndEditedProvider = ({ children }) => {
  const { setChangepage, setLoading, getid } = MichiHook();
  const [find, setFind] = useState({});
  const [loadingedited, setLoadingEdited] = useState(false);
  const modelRef2 = useRef(null);
  const glbRef2 = useRef(null);
  const mixersRef = useRef([]);
  const changeTexture = (texture, cube) => {
    const tex = new THREE.TextureLoader().load(`/texture/${texture}`);

    tex.flipY = false;
    modelRef2.current.traverse((node) => {
      if (node.isMesh && node.name == cube) {
        if(cube == 'Cube001'){
          
          /* node.material.transparent = true;
          node.material.opacity = 0.9;
          node.material.alphaTest = 0.1;
          node.material.needsUpdate = true; */
       
        node.visible = true; 
      }
       
        if (texture == "nada") {
          node.visible = false;
        }else{
          node.visible = true;
          node.material.map = tex;
        }
    
      }
    });
  };

  const move3d = () => {
    if (modelRef2.current && glbRef2.current) {
       modelRef2.current.rotation.y += 0

      const mixer = new THREE.AnimationMixer(modelRef2.current);
      glbRef2.current.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
      });

      mixersRef.current.push(mixer);
    }
  };

  const initialState = [
    { name: "dfd.png", cube: "Cube002" },
    { name: "nada", cube: "Cube001" },
    { name: "nada", cube: "Cube003" },
    { name: "nada", cube: "Cube" }
  ];

  const [selectedValuetext, setSelectedValuetext] = useState("");
  const [selectedValue, setSelectedValue] = useState(initialState);
  const resetSelectedValue = () => {
    setSelectedValue(initialState);
    setSelectedValuetext("");
    setErrorMessage('')
  };
  const [errorMessage, setErrorMessage] = useState('');
  const[createandediteloading,setCreateandEditLoading]=useState(false)
  const CreatedArray = () => {
   
    if (selectedValuetext.trim() === '') {
      setErrorMessage('Nombre Vacio');
    } else if (selectedValuetext.length > 10) {
      setErrorMessage('maximo 10 caracteres');
    } else {
      setErrorMessage('');
     
      setCreateandEditLoading(true)
    
    const newObject = {
      name: selectedValuetext,
      textura: selectedValue,
    };

    const NewMichix = async () => {
      try {
        await NewMichi(newObject);
        await GetAllMichis();
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(true);
      }
    };

    NewMichix(); 

    move3d();

    setTimeout(() => {
      setCreateandEditLoading(false)
      setChangepage("Cats");
    }, 3000);
  }
  };

  const handleUpdate = (e, cubex) => {
    const newValue = e.target.value;
    setSelectedValue((prevState) =>
      prevState.map((item) =>
        item.cube === cubex ? { ...item, name: newValue } : item
      )
    );
  };

  const GetidMichix = async (id) => {
    setLoadingEdited(false);

    try {
      const result = await GetIdMichi(id);
      setFind(result);
    } catch (error) {
      console.error("Error al obtener el documento:", error);
    } finally {
      setTimeout(() => {
        setLoadingEdited(true);
      }, 1000);
    }
  };

  const Volver = () => {
    setLoading(true);
    setChangepage("Cats");
  };
  const [selectedValueEdit, setselectedValueEdit] = useState({
    anteojos: "",
    ropa: "",
    color: "",
    puntaje: 0,
  });
  const [errorMessageedit, setErrorMessageEdit] = useState('');
  const [selectedValueEdittext, setselectedValueEdittext] = useState("");
  const EditedArray = () => {

    if (selectedValueEdittext.trim() === '') {
      setErrorMessageEdit('El campo no puede estar vacío.');
    } else if (selectedValueEdittext.length > 10) {
      setErrorMessageEdit('El texto no puede tener más de 10 caracteres.');
    } else {
      setErrorMessageEdit('')
      setCreateandEditLoading(true)
    const EditMichisObject = {
      name: selectedValueEdittext,
      color: selectedValueEdit.color,
      anteojos: selectedValueEdit.anteojos,
      remera: selectedValueEdit.ropa,
      puntaje: selectedValueEdit.puntaje,
    };

    const updateMichi = async () => {
      try {
        await UptadeMichi(getid, EditMichisObject);
        setLoading(true);
      } catch (error) {
        console.error("Error updating document:", error);
      } finally {
      }
    };

    updateMichi();

    move3d();

    setTimeout(() => {
      setCreateandEditLoading(false)
      setChangepage("Cats");
    }, 3000);
  }
  };


  const[loadingcreate,setLoadingCreate]= useState(false)
  return (
    <MichiCreateAndEditedContext.Provider
      value={{
        move3d,
        CreatedArray,
        selectedValuetext,
        setSelectedValuetext,
        selectedValue,
        setSelectedValue,
        Volver,
        changeTexture,
        setChangepage,
        handleUpdate,
        modelRef2,
        glbRef2,
        mixersRef,
        resetSelectedValue,
        GetidMichix,
        selectedValueEdit,
        setselectedValueEdit,
        selectedValueEdittext,
        setselectedValueEdittext,
        EditedArray,
        loadingedited,
        setLoadingEdited,
        find,
        loadingcreate,setLoadingCreate,
        errorMessage,
        errorMessageedit,
        createandediteloading
      }}
    >
      {children}
    </MichiCreateAndEditedContext.Provider>
  );
};
