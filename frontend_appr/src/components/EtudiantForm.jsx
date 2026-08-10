import { useState } from "react";
import { ajouterEtudiant } from "../services/etudiantService";

function EtudiantForm({ onEtudiantAjoute }) {

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nouvelEtudiant = {
            nom: nom,
            prenom: prenom,
            email: email
        };

        try {
            await ajouterEtudiant(nouvelEtudiant);

            alert("Étudiant ajouté avec succès !");

            setNom("");
            setPrenom("");
            setEmail("");

            onEtudiantAjoute();

        } catch (error) {
            console.error("Erreur :", error);
            alert("Erreur lors de l'ajout");
        }
    };

    return (
        <div>
            <h2>Ajouter un étudiant</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Nom : </label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Prénom : </label>
                    <input
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Email : </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">
                    Ajouter
                </button>

            </form>
        </div>
    );
}

export default EtudiantForm;