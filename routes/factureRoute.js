// routes/factureRoutes.js
const express = require('express');
const router = express.Router();
const factureController = require('../controllers/factureController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes pour les factures
router.post('/factures', authMiddleware.verifyAdmin, factureController.genererFacture); // générer une facture
router.put('/factures/:id', authMiddleware.verifyClient, factureController.payerFacture); // payer une facture

module.exports = router;
