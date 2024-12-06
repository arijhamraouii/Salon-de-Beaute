const express = require('express');
const router = express.Router();
const catalogueController = require('../controllers/catalogueController');

// Route pour afficher tous les catalogues
router.get('/', catalogueController.afficherCatalogues);

// Route pour afficher la page d'ajout d'un catalogue
router.get('/ajouter', (req, res) => res.render('catalogues/ajouter'));

// Route pour ajouter un catalogue (POST)
router.post('/ajouter', catalogueController.ajouterCatalogue);

// Route pour afficher la page de modification d'un catalogue (GET)
router.get('/modifier/:id', async (req, res) => {
    try {
        const catalogue = await Catalogue.findById(req.params.id);
        res.render('catalogues/modifier', { catalogue });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération du catalogue pour modification." });
    }
});

// Route pour modifier un catalogue (POST)
router.post('/modifier/:id', catalogueController.modifierCatalogue);

// Route pour supprimer un catalogue
router.get('/supprimer/:id', catalogueController.supprimerCatalogue);

module.exports = router;
