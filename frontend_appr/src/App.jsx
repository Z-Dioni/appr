import { useState } from "react";
import EtudiantList from "./components/EtudiantList";
import EtudiantForm from "./components/EtudiantForm";

function App() {

  const [actualisation, setActualisation] = useState(false);

  const actualiserListe = () => {
    setActualisation(!actualisation);
  };

  return (
    <div>

      <h1>Gestion des étudiants</h1>

      <EtudiantForm
        onEtudiantAjoute={actualiserListe}
      />

      <EtudiantList
        key={actualisation}
      />

    </div>
  );
}

export default App;