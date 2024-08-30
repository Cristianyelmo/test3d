"use client";
import { useEffect } from "react";

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
    setDelete,
    addscore,
    scoreid,
    visiblePages,
  } = MichiHook();
  const { resetSelectedValue } = MichiCreateAndEditedHook();
  useEffect(() => {
    GetallMichis();
    console.log(addscore);
  }, []);
  const updateNew = () => {
    setChangepage("CreateCats");
    resetSelectedValue();
  };
  console.log(currentGatos);
  if (loading) {
    return (
      <div className="bg-black text-white relative h-screen w-full  fondo-content">
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <p className="hollow-neon-text text-3xl mb-4">cargando...</p>
          <Image
            src="/texture/tte.png"
            width={128}
            height={128}
            alt="Cargando"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex fondo-content  justify-center items-center min-h-screen mt-10">
      {modal.delete && (
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80">
          <div class="neon-border p-6 rounded-lg shadow-lg w-80">
            <h2 class="text-xl font-bold mb-4">
              quieres eliminar a {infoModal.name} ?
            </h2>
            <div className="flex space-x-2">
              <button
                class=" text-white py-2 px-4 rounded neon-border2 "
                onClick={() => gatosDelete(infoModal.id)}
              >
                eliminar
              </button>
              <button
                class="neon-border-ver text-white py-2 px-4 rounded "
                onClick={() =>
                  setModal((prevState) => ({
                    ...prevState,
                    delete: false,
                  }))
                }
              >
                cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {modal.view && (
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80">
          <div class=" p-6 rounded-lg shadow-lg bg-transparent">
            <button
              onClick={() =>
                setModal((prevState) => ({
                  ...prevState,
                  view: false,
                }))
              }
            >
              cerrar
            </button>
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
        <h1 className="neon-text text-4xl  ">PetMaker</h1>
        <div className="relative mb-14 w-full">
          <button
            className="neon-border-crear p-2 absolute right-0"
            onClick={updateNew}
          >
            crear
          </button>
        </div>

        <div className="grid lg:grid-cols-3 lg:gap-3 grid-cols-1 gap-1 justify-center lg:space-y-0 space-y-10">
          {currentGatos.map((gato, index) => (
            <div
              key={gato.id}
              className={` ${
                idanimation == gato.id
                  ? (setDelete(true), "animation-delete z-50")
                  : "animation-open"
              }`}
            >
              <Modelss
                orbitControls={false}
                texture={gato.textura}
                editandcreate={false}
              />
              {/* <div className={`w-[300px] h-[300px] `}>

                </div> */}

              <p className="text-center text-2xl">{gato.name}</p>
              <div className="text-white flex justify-center space-x-2 mb-2">
                <p className="text-2xl">{gato.puntaje}</p>

                <button disabled={addscore} onClick={() => AddScore(gato.id)}>
                  <Image
                    className={`${
                      scoreid == gato.id && addscore && "rotate-start"
                    }`}
                    src="/texture/star.webp"
                    width={30}
                    height={30}
                  />
                </button>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => gatofind(gato.id)}
                  className="bg-black text-white p-2 neon-border-editar"
                >
                  editar
                </button>
                <button
                  onClick={() => gatoModal(gato.id, "delete")}
                  className="bg-transparent text-white p-2 neon-border2"
                >
                  eliminar
                </button>
                <button
                  onClick={() => gatoModal(gato.id, "view")}
                  className="bg-black text-white p-2 neon-border-ver"
                >
                  ver
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-10 mb-10  ">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 neon-border  rounded-l disabled:opacity-50"
          >
            &lt;
          </button>

          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border-[#24c2d3] border-[1px]  ${
                page === currentPage ? "bg-[#3b094d] text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 neon-border  rounded-r disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
