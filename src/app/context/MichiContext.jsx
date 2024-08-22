// context/HomeContext.js
"use client";
import { createContext, useContext, useState, useRef } from "react";
import * as THREE from "three";

import { AddScoreMichi, DeleteMichi, GetAllMichis, GetIdMichi } from "../services/Crud.service";
export const MichiContext = createContext(null);

export const MichiHook = () => {
  return useContext(MichiContext);
};

export const MichiProvider = ({ children }) => {
  const [gatos, setGatos] = useState([]);

  const [find,setFind] = useState({});
  const [changepage, setChangepage] = useState("Cats");
  const [loadingedited,setLoadingEdited] = useState(false)
  const [getid,setGetid] = useState(false)
  const gatofind = (id) => {
    setGetid(id)
    setChangepage("EditedCats"); 
  };

 
 
  const [changePagePresentation,setChangePagePresentation]= useState(true)
  const otherRef = useRef(null);



  const [viewModal, setViewModal] = useState(false);

  const [viewview, setViewview] = useState(false);
  const [infoview, setInfoView] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [idanimation, setIdAnimation] = useState(null);

  const AddScore = async(id) =>{
 

    try {
      console.log(id)
     await AddScoreMichi(id)
    } catch (error) {
      console.error
    }finally{
      GetallMichis()
    }





  }






  const [loading, setLoading] = useState(true);
 

  const GetallMichis = async () => {
    try {
     const data = await GetAllMichis()
      setGatos(data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      
    }finally{
      setLoading(false);
    }
  };



  const gatoModal = (id) => {
    setViewModal(true);

    const hola = gatos.find((obj) => obj.id == id);
    setInfoModal(hola);
    console.log(hola);
  };



  const gatoView = (id) => {
    setViewview(true);

    const hola = gatos.find((obj) => obj.id == id);
    setInfoView(hola);
  };
  const gatosDelete = (id) => {
  
    setViewModal(false);

    setIdAnimation(id);
    
    setTimeout(() => {
   
      const DeleteMichis = async () => {
        try {
          await DeleteMichi(id)
        } catch (error) {
          console.error("Error deleting document:", error);
        } finally {
          GetallMichis();
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


















  return (
    <MichiContext.Provider
      value={{
       
        gatos,
        gatofind,
        find,
        setFind,
        changepage,
        setChangepage,
      
       
        setGatos,
        changePagePresentation,setChangePagePresentation,
        otherRef,
        loadingedited,
        setLoadingEdited,
        getid,
        viewModal, setViewModal,
        viewview, setViewview,
        infoview, setInfoView,
        infoModal, setInfoModal,
        idanimation, setIdAnimation,
        gatos, setGatos,
        AddScore,
        GetallMichis,loading, setLoading,
        gatoModal,gatoView,gatosDelete,
        currentGatos,handlePageChange,totalPages,
        currentPage, setCurrentPage
       
      }}
    >
      {children}
    </MichiContext.Provider>
  );
};
