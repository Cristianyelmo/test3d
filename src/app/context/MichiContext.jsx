// context/HomeContext.js
"use client";
import { createContext, useContext, useState, useRef } from "react";
import * as THREE from "three";

import {
  AddScoreMichi,
  DeleteMichi,
  GetAllMichis,
  GetIdMichi,
} from "../services/Crud.service";
export const MichiContext = createContext(null);

export const MichiHook = () => {
  return useContext(MichiContext);
};

export const MichiProvider = ({ children }) => {
  const [gatos, setGatos] = useState([]);

  const [changepage, setChangepage] = useState("Cats");

  const [getid, setGetid] = useState(false);
  const gatofind = (id) => {
    setGetid(id);
    setChangepage("EditedCats");
  };

  const [changePagePresentation, setChangePagePresentation] = useState(true);

  const [modal, setModal] = useState({
    delete: false,
    view: false,
  });

  const [infoModal, setInfoModal] = useState(false);
  const [idanimation, setIdAnimation] = useState(null);

  const AddScore = async (id) => {
    try {
      await AddScoreMichi(id);
    } catch (error) {
      console.error;
    } finally {
      GetallMichis();
    }
  };

  const [loading, setLoading] = useState(true);

  const GetallMichis = async () => {
    try {
      const data = await GetAllMichis();
      setGatos(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
     
    }
  };

  const gatoModal = (id, value) => {
    setModal((prevState) => ({
      ...prevState,
      [value]: true,
    }));
    const gatoid = gatos.find((obj) => obj.id == id);

    setInfoModal(gatoid);
  };

  const gatosDelete = (id) => {
    setModal((prevState) => ({
      ...prevState,
      delete: false,
    }));
    setIdAnimation(id);

    setTimeout(() => {
      const DeleteMichis = async () => {
        try {
          await DeleteMichi(id);
        } catch (error) {
          console.error("Error deleting document:", error);
        } finally {
          await GetallMichis();
          setDelete(false)
        }
      };
      DeleteMichis();

      const newTotalPages = Math.ceil(gatos.length / ITEMS_PER_PAGE);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    }, 2000);
  };

  const ITEMS_PER_PAGE = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGatos = gatos.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(gatos.length / ITEMS_PER_PAGE);
  const [deletex,setDelete] = useState(false)
  return (
    <MichiContext.Provider
      value={{
        gatos,
        gatofind,
        changepage,
        setChangepage,

        setGatos,
        changePagePresentation,
        setChangePagePresentation,
        getid,
        infoModal,
        setInfoModal,
        idanimation,
        setIdAnimation,
        gatos,
        setGatos,
        AddScore,
        GetallMichis,
        loading,
        setLoading,
        gatoModal,
        gatosDelete,
        currentGatos,
        handlePageChange,
        totalPages,
        currentPage,
        setCurrentPage,
        setModal,
        modal,
        deletex,setDelete
      }}
    >
      {children}
    </MichiContext.Provider>
  );
};
