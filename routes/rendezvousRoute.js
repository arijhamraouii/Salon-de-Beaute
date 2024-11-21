// routes/rendezvousRoutes.js
const express = require('express');
const router = express.Router();
const rendezvousController = require('../controllers/rendezvousController');
const authMiddleware = require('../middlewares/authMiddleware'); // pour protéger les routes

// Routes pour les rendez-vous
router.post('/rendezvous', authMiddleware.verifyClient, rendezvousController.planifierRendezvous); // planifier un rendez-vous
router.put('/rendezvous/:id', authMiddleware.verifyClient, rendezvousController.modifierRendezvous); // modifier un rendez-vous
router.delete('/rendezvous/:id', authMiddleware.verifyClient, rendezvousController.annulerRendezvous); // annuler un rendez-vous

module.exports = router;
