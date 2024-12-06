const express = require('express');
const router = express.Router();
const factureController = require('../controllers/factureController');

router.get('/', factureController.afficherFactures);
router.get('/ajouter', (req, res) => res.render('factures/ajouter'));

router.post('/ajouter', factureController.ajouterFacture);
router.get('/payer/:id', factureController.payerFacture);

module.exports = router;
