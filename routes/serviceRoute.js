
// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middlewares/authMiddleware'); // pour protéger les routes

// Routes pour les services
router.post('/services', authMiddleware.verifyAdmin, serviceController.ajouterService);  // ajouter un service (administrateur)
router.get('/services', serviceController.listerServices); // lister tous les services
router.get('/services/:id', serviceController.recupererService); // récupérer un service
router.put('/services/:id', authMiddleware.verifyAdmin, serviceController.modifierService); // modifier un service (administrateur)
router.delete('/services/:id', authMiddleware.verifyAdmin, serviceController.supprimerService); // supprimer un service (administrateur)

module.exports = router;
