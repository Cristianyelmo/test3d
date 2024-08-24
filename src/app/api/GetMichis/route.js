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
    const michis = querySnapshot.docs.map((doc,index) => (
    index <= 2 ?
      {
      id: doc.id,
      name: doc.data().name,
      textura: [
        {
          name: doc.data().color,
          cube: "Cube002",
        },
        {
          name: doc.data().anteojos,
          cube: "Cube001",
        },
        {
          name: doc.data().remera,
          cube: "Cube003",
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
          cube: "Cube002",
        },
        {
          name: doc.data().anteojos,
          cube: "Cube001",
        },
        {
          name: doc.data().remera,
          cube: "Cube003",
        },
      ],
      puntaje:doc.data().puntaje,
      premios:'no'
    }

 

  ))

  

    return NextResponse.json(michis);
  } catch (e) {
    console.error("errores: ", e);
  }
}
