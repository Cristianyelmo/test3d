import { db } from "../../../lib/config/firebase";
import { doc, updateDoc,getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const docRef = doc(db, "gatos", id);
    const docSnap = await getDoc(docRef);
    const newScore = docSnap.data().puntaje + 1;
    const data = {
      id: docSnap.id,
      name: docSnap.data().name,
      color: docSnap.data().color,
      anteojos: docSnap.data().anteojos,
      remera: docSnap.data().remera,
      puntaje: newScore
    };

    await updateDoc(docRef,data);
    return NextResponse.json({
      success: true,
      message: `Puntaje Agregado`,
    });
  } catch (e) {
    console.error("errores: ", e);
    return NextResponse.json({ success: false, error: e.message });
  }
}
