"use client";
import { useEffect, useRef, useState } from "react";

import Modelss from "../Modelss";
import { MichiHook } from "../../context/MichiContext";

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
    modal
  } = MichiHook();

  useEffect(() => {
    GetallMichis();
  }, []);

  if (loading) {
    return <div>...espere</div>;
  } else {
    return (
      <div className="flex">
        {modal.delete && (
          <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 class="text-xl font-bold mb-4">
                quieres eliminar a {infoModal.name}
              </h2>
              <button
                class="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => gatosDelete(infoModal.id)}
              >
                Emilinar
              </button>
              <button
                class="bg-blue-500 text-white py-2 px-4 rounded"
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
            <div class="bg-white p-6 rounded-lg shadow-lg w-80">
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

        <div className="flex flex-col">
          <div className="flex">
            {currentGatos.map((gato, index) => (
              <div
                key={gato.id}
                className={` ${
                  idanimation == gato.id ? "animation-delete" : "animation-open"
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
                    className="bg-black text-white p-2"
                  >
                    editar
                  </button>
                  <button
                    onClick={() => gatoModal(gato.id,'delete')}
                    className="bg-black text-white p-2"
                  >
                    eliminar
                  </button>
                  <button
                    onClick={() => gatoModal(gato.id,'view')}
                    className="bg-black text-white p-2"
                  >
                    ver
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="border-[1px] border-black"
            onClick={() => setChangepage("CreateCats")}
          >
            crear
          </button>

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
