import { db } from "../../../lib/config/firebase";
import {doc, deleteDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export async function DELETE(request,{ params }) {
  try {
    
   
   const {id} = params
    const docRef = doc(db, "gatos", id);


   
    await deleteDoc(docRef);
    
   
    return NextResponse.json({ success: true, message: "Documento eliminado correctamente." });
  } catch (e) {
    console.error("Error obteniendo documentos: ", e);
    return NextResponse.json({ success: false, error: e.message });
  }
}