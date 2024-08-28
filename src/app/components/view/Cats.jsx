"use client";
import { useEffect, useRef, useState } from "react";

import Modelss from "../Modelss";
import { MichiHook } from "../../context/MichiContext";
import { MichiCreateAndEditedHook } from "@/app/context/MichiCreateAndEditedContext";
import Image from "next/image";

export default function Cats() {
  const {
    gatofind,
    setChangepage,
    infoModal,
    idanimation,
    AddScore,
    GetallMichis,
    loading,
    gatoModal,
    gatosDelete,
    handlePageChange,
    currentGatos,
    totalPages,
    currentPage,
    setModal,
    modal,
    deletex,
    setDelete
  } = MichiHook();
const {resetSelectedValue} =MichiCreateAndEditedHook()
  useEffect(() => {
    GetallMichis();
    
  }, []);
  const updateNew = () => {
    setChangepage("CreateCats");
    resetSelectedValue();
  };
console.log(currentGatos)
  if (loading) {
    return <div className="bg-black text-white relative h-screen w-full  fondo-content">
      <div className="absolute inset-0 flex flex-col justify-center items-center">
    <p className="hollow-neon-text text-3xl mb-4">cargando...</p>
    <Image src="/texture/tte.png" width={128} height={128} alt="Cargando" />
  </div>
      </div>;
        
  } else {
    return (
      <div className="flex fondo-content  justify-center">
        {modal.delete && (
          <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 class="text-xl font-bold mb-4">
                quieres eliminar a {infoModal.name}
              </h2>
              <button
                class="bg-blue-500 text-white py-2 px-4 rounded "
                onClick={() => gatosDelete(infoModal.id)}
              >
                Emilinar
              </button>
              <button
                class="bg-blue-500 text-white py-2 px-4 rounded "
                onClick={() => setModal(prevState => ({
                  ...prevState,
                  delete: false
                }))}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {modal.view && (
          <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-[300px] h-[300px]">
              <button onClick={() => setModal(prevState => ({
                  ...prevState,
                  view: false
                }))}>cerrar</button>
              <Modelss
                texture={infoModal.textura}
                editandcreate={false}
                orbitControls={true}
              />
            </div>
          </div>
        )}



{deletex && (
          <div
            className={`fixed inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-50 
  transition-opacity duration-500 ease-in-out ${
    deletex ? "opacity-100" : "opacity-0"
  }`}
          ></div>
        )}

        <div className="flex flex-col items-center">
         
          <div className="grid lg:grid-cols-3 lg:gap-3 grid-cols-1 gap-1 justify-center">
            {currentGatos.map((gato, index) => (
              <div
                key={gato.id}
                className={` ${
                  idanimation == gato.id ? (setDelete(true), "animation-delete z-50"): "animation-open"
                }`}
              >
                <Modelss
                  texture={gato.textura}
                  editandcreate={false}
                  index={gato.id}
                />
                <p>{gato.name}</p>
                <p className="text-black">{gato.puntaje}</p>
                <p className="text-black">{gato.premios}</p>
                <button onClick={() => AddScore(gato.id)}>puntaje</button>
                <div className="space-x-2">
                  <button
                    onClick={() => gatofind(gato.id)}
                    className="bg-black text-white p-2 neon-border-editar"
                  >
                    editar
                  </button>
                  <button
                    onClick={() => gatoModal(gato.id,'delete')}
                    className="bg-transparent text-white p-2 neon-border2"
                  >
                    eliminar
                  </button>
                  <button
                    onClick={() => gatoModal(gato.id,'view')}
                    className="bg-black text-white p-2 neon-border-ver"
                  >
                    ver
                  </button>
                </div>
              </div>
            ))}
          </div>
         
          <div>
        <button
            className=""
            onClick={updateNew}
          >
            crear
          </button>
          </div>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 p-2 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>


       
      </div>
    );
  }
}
