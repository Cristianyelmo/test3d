// src/app/api/newuser/route.js

import { db } from '../../lib/config/firebase';  // Ajusta la ruta según tu estructura de carpetas
import { collection, addDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const newObject = await request.json(); 
    

     const usuariosRef = collection(db, "gatos");  

    
    const docRef = await addDoc(usuariosRef, {
        name:newObject.name,
        color:newObject.textura[0].name,
        anteojos:newObject.textura[1].name,
        remera:newObject.textura[2].name
    });

    console.log("Documento agregado con ID: ", docRef.id); 

    return NextResponse.json('hola');  
  } catch (e) {
    console.error("Error agregando documento: ", e);
    return NextResponse.json({ success: false, error: e.message });  
  }
}

