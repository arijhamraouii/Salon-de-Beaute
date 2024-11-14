/*
let express = require("express");
let router = express.Router();

// Exemple de route GET pour obtenir la liste des clients
router.get("/", (req, res) => {
  res.send("Liste de tous les clients");
});

// Exemple de route POST pour ajouter un client
router.post("/add", (req, res) => {
  res.send("Ajout d'un client");
});

// Exemple de route GET pour obtenir un client par ID
router.get("/:id", (req, res) => {
  res.send(`Informations sur le client avec l'ID ${req.params.id}`);
});

module.exports = router;

*/

const express = require('express');
const { inscrireClient, loginClient, majClient, supprimerClient } = require('../controllers/clientController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', inscrireClient);
router.post('/login', loginClient);
router.put('/:id', protect, majClient);
router.delete('/:id', protect, supprimerClient);

module.exports = router;
