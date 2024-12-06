const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const Client = require('../models/Client');

// Route pour afficher tous les clients
router.get('/', clientController.afficherClients);

// Route pour afficher la page d'ajout d'un client
router.get('/ajouter', (req, res) => res.render('clients/ajouter'));

// Route pour ajouter un client (POST)
router.post('/ajouter', clientController.ajouterClient);

// Route pour afficher la page de modification d'un client (GET)
router.get('/modifier/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ error: "Client non trouvé" });
        }
        res.render('clients/modifier', { client });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération du client pour modification." });
    }
});

// Route pour modifier un client (POST)
router.post('/modifier/:id', clientController.modifierClient);

// Route pour supprimer un client
router.get('/supprimer/:id', clientController.supprimerClient);

module.exports = router;
