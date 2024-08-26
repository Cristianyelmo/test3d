import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../../lib/config/firebase";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
  const { id } = params;


  try {
    const docRef = doc(db, "gatos", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return new Response(JSON.stringify({ error: "Document not found" }), {
        status: 404,
      });
    }


const data = {
    id: docSnap.id,
    name: docSnap.data().name,
    textura: [
      {
        name: docSnap.data().color,
        cube: "Cube002",
      },
      {
        name: docSnap.data().anteojos,
        cube: "Cube001",
      },
      {
        name: docSnap.data().remera,
        cube: "Cube003",
      },
      {
        name: 'nada',
        cube: "Cube",
      },
    ],
  }



    return NextResponse.json(data)
  } catch (error) {
    console.error("errores: ", e);
  }
}
