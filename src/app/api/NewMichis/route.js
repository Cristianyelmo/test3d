// src/app/api/newuser/route.js

import { db } from '../../lib/config/firebase';  // Ajusta la ruta según tu estructura de carpetas
import { collection, addDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function POST(request) {
  try {
    const newObject = await request.json(); 
    

     const usuariosRef = collection(db, "gatos");  

    
   await addDoc(usuariosRef, {
        name:newObject.name,
        color:newObject.textura[0].name,
        anteojos:newObject.textura[1].name,
        remera:newObject.textura[2].name,
        puntaje:0
    });

 

    return NextResponse.json({
      success: true,
      message: `Michi nuevo`,
    });  
  } catch (e) {
    console.error("errores: ", e);
    return NextResponse.json({ success: false, error: e.message });
  }
}

