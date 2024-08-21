import { db } from "../../lib/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const usuariosRef = collection(db, "gatos");

    const querySnapshot = await getDocs(usuariosRef);

    const usuarios = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      textura: [
        {
          name: doc.data().color,
          cube: "Cube",
        },
        {
          name: doc.data().anteojos,
          cube: "Cube001",
        },
        {
          name: doc.data().remera,
          cube: "Cube002",
        },
      ],
    }));

    console.log("Usuarios obtenidos: ", usuarios);

    return NextResponse.json(usuarios);
  } catch (e) {
    console.error("Error obteniendo documentos: ", e);
    return NextResponse.json({ success: false, error: e.message });
  }
}
