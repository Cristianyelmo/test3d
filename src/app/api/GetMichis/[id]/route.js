import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../../lib/config/firebase";

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
        cube: "Cube",
      },
      {
        name: docSnap.data().anteojos,
        cube: "Cube001",
      },
      {
        name: docSnap.data().remera,
        cube: "Cube002",
      },
    ],
  }

console.log(data)

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to retrieve document" }), {
      status: 500,
    });
  }
}
