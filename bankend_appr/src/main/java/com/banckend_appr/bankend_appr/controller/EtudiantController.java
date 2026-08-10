package com.banckend_appr.bankend_appr.controller;

import com.banckend_appr.bankend_appr.entity.Etudiant;
import com.banckend_appr.bankend_appr.service.EtudiantService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/etudiants")
public class EtudiantController {

    private final EtudiantService service;

    public EtudiantController(EtudiantService service) {
        this.service = service;
    }

    @GetMapping
    public List<Etudiant> getAllEtudiants() {
        return service.getAllEtudiants();
    }

    @PostMapping
    public Etudiant ajouterEtudiant(@RequestBody Etudiant etudiant) {
        return service.ajouterEtudiant(etudiant);
    }

    @PutMapping("/{id}")
    public Etudiant modifierEtudiant(@PathVariable Long id,
                                     @RequestBody Etudiant etudiant) {

        return service.modifierEtudiant(id, etudiant);
    }

    @DeleteMapping("/{id}")
    public void supprimerEtudiant(@PathVariable Long id) {
        service.supprimerEtudiant(id);
    }
}