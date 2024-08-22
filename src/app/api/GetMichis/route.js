import { db } from "../../lib/config/firebase";
import { collection, getDocs, query, orderBy, } from "firebase/firestore";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const usuariosRef = collection(db, "gatos");
    const q = query(usuariosRef, orderBy("puntaje","desc"));

    
    const querySnapshot = await getDocs(q);
const premios = ['oro','plata','bronce']
    const usuarios = querySnapshot.docs.map((doc,index) => (
    index <= 2 ?
      {
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
      puntaje:doc.data().puntaje,
      premios:!doc.data().puntaje == 0 ? premios[index] : 'no'

    } :

    {
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
      puntaje:doc.data().puntaje,
      premios:'no'
    }

 

  ))

    console.log("Usuarios obtenidos: ", usuarios);

    return NextResponse.json(usuarios);
  } catch (e) {
    console.error("Error obteniendo documentos: ", e);
    return NextResponse.json({ success: false, error: e.message });
  }
}
