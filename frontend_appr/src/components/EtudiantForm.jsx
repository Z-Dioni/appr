import { useState } from "react";
import { ajouterEtudiant } from "../services/etudiantService";

function EtudiantForm({ onEtudiantAjoute }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({});
  const [errorGlobal, setErrorGlobal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation simple
  const validateForm = () => {
    const newErrors = {};

    if (!nom.trim()) {
      newErrors.nom = "Le nom est obligatoire.";
    }

    if (!prenom.trim()) {
      newErrors.prenom = "Le prénom est obligatoire.";
    }

    if (!email.trim()) {
      newErrors.email = "L'email est obligatoire.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "L'email n'est pas valide.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGlobal("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const nouvelEtudiant = { nom, prenom, email };

    try {
      await ajouterEtudiant(nouvelEtudiant);
      setNom("");
      setPrenom("");
      setEmail("");
      setErrors({});
      onEtudiantAjoute?.();
    } catch (error) {
      console.error("Erreur :", error);
      setErrorGlobal(
        error?.response?.data?.message ||
          "Une erreur est survenue lors de l'ajout."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 id="form-title">Ajouter un étudiant</h2>

      {errorGlobal && (
        <div
          role="alert"
          style={{
            color: "#b91c1c",
            backgroundColor: "#fef2f2",
            padding: "0.5rem 0.75rem",
            borderRadius: "0.25rem",
            marginBottom: "1rem",
          }}
        >
          {errorGlobal}
        </div>
      )}

      <form onSubmit={handleSubmit} aria-labelledby="form-title" noValidate>
        {/* Nom */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="nom" style={{ display: "block", marginBottom: "0.25rem" }}>
            Nom <span aria-hidden="true">*</span>
          </label>
          <input
            id="nom"
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            aria-invalid={!!errors.nom}
            aria-describedby={errors.nom ? "nom-error" : undefined}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderColor: errors.nom ? "#b91c1c" : "#ccc",
              borderRadius: "0.25rem",
            }}
          />
          {errors.nom && (
            <div
              id="nom-error"
              role="alert"
              style={{ color: "#b91c1c", fontSize: "0.875rem", marginTop: "0.25rem" }}
            >
              {errors.nom}
            </div>
          )}
        </div>

        {/* Prénom */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="prenom" style={{ display: "block", marginBottom: "0.25rem" }}>
            Prénom <span aria-hidden="true">*</span>
          </label>
          <input
            id="prenom"
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            aria-invalid={!!errors.prenom}
            aria-describedby={errors.prenom ? "prenom-error" : undefined}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderColor: errors.prenom ? "#b91c1c" : "#ccc",
              borderRadius: "0.25rem",
            }}
          />
          {errors.prenom && (
            <div
              id="prenom-error"
              role="alert"
              style={{ color: "#b91c1c", fontSize: "0.875rem", marginTop: "0.25rem" }}
            >
              {errors.prenom}
            </div>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "0.25rem" }}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderColor: errors.email ? "#b91c1c" : "#ccc",
              borderRadius: "0.25rem",
            }}
          />
          {errors.email && (
            <div
              id="email-error"
              role="alert"
              style={{ color: "#b91c1c", fontSize: "0.875rem", marginTop: "0.25rem" }}
            >
              {errors.email}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: isSubmitting ? "#9ca3af" : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "0.25rem",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Ajout en cours..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
}

export default EtudiantForm;