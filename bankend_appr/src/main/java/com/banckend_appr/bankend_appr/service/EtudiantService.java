package com.banckend_appr.bankend_appr.service;

import com.banckend_appr.bankend_appr.entity.Etudiant;
import com.banckend_appr.bankend_appr.repository.EtudiantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EtudiantService {

    private final EtudiantRepository repository;

    public EtudiantService(EtudiantRepository repository) {
        this.repository = repository;
    }

    public List<Etudiant> getAllEtudiants() {
        return repository.findAll();
    }

    public Etudiant ajouterEtudiant(Etudiant etudiant) {
        return repository.save(etudiant);
    }

    public Etudiant modifierEtudiant(Long id, Etudiant nouvelEtudiant) {

        Etudiant etudiant = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Étudiant introuvable"));

        etudiant.setNom(nouvelEtudiant.getNom());
        etudiant.setPrenom(nouvelEtudiant.getPrenom());
        etudiant.setEmail(nouvelEtudiant.getEmail());

        return repository.save(etudiant);
    }

    public void supprimerEtudiant(Long id) {

        repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Étudiant introuvable"));

        repository.deleteById(id);
    }
}