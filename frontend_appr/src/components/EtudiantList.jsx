import { useEffect, useState } from "react";
import { getEtudiants } from "../services/etudiantService";

function EtudiantList() {

    const [etudiants, setEtudiants] = useState([]);

    useEffect(() => {
        chargerEtudiants();
    }, []);

    const chargerEtudiants = async () => {
        try {
            const response = await getEtudiants();
            setEtudiants(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement :", error);
        }
    };

    return (
        <div>
            <h2>Liste des étudiants</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prénoms</th>
                        <th>Email</th>
                    </tr>
                </thead>

                <tbody>
                    {etudiants.map((etudiant) => (
                        <tr key={etudiant.id}>
                            <td>{etudiant.id}</td>
                            <td>{etudiant.nom}</td>
                            <td>{etudiant.prenom}</td>
                            <td>{etudiant.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EtudiantList;