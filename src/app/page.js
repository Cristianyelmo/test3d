"use client";
import { MichiHook } from "./context/MichiContext";
import Crud from "./components/Crud";
import Presentation from "./components/Presentation";
export default function Home() {
  const { changePagePresentation } = MichiHook();

  return <div>
    
    {changePagePresentation ? <Presentation /> : <Crud />}

    </div>;
}
