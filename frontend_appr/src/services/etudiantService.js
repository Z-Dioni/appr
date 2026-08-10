import axios from "axios";

const API_URL = "http://localhost:8080/etudiants";

export const getEtudiants = () => {
    return axios.get(API_URL);
};

export const ajouterEtudiant = (etudiant) => {
    return axios.post(API_URL, etudiant);
};

export const modifierEtudiant = (id, etudiant) => {
    return axios.put(`${API_URL}/${id}`, etudiant);
};

export const supprimerEtudiant = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};