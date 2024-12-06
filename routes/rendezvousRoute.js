const express = require('express');
const router = express.Router();
const rendezvousController = require('../controllers/rendezvousController');

router.get('/', rendezvousController.afficherRendezvous);
router.get('/ajouter', (req, res) => res.render('rendezvous/ajouter'));
router.post('/ajouter', rendezvousController.ajouterRendezvous);
router.get('/modifier/:id', async (req, res) => {
    const rdv = await Rendezvous.findById(req.params.id);
    res.render('rendezvous/modifier', { rdv });
});
router.post('/modifier/:id', rendezvousController.modifierRendezvous);
router.get('/supprimer/:id', rendezvousController.supprimerRendezvous);

module.exports = router;
