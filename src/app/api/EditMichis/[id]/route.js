import { db } from "../../../lib/config/firebase";
import {doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export async function PUT(request, { params }) {
  try {
    const newObject = await request.json(); 
    const { id } = params;
    const docRef = doc(db, "gatos", id);

    
    await updateDoc(docRef, newObject);
    return NextResponse.json({ success: true, message: "Documento actualizado correctamente." });
  } catch (e) {
    console.error("Error obteniendo documentos: ", e);
    return NextResponse.json({ success: false, error: e.message });
  }
}
