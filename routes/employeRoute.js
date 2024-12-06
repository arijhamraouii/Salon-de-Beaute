const express = require('express');
const router = express.Router();
const employeController = require('../controllers/employeController');

router.get('/', employeController.afficherEmployes);
router.get('/ajouter', (req, res) => res.render('employes/ajouter'));
router.post('/ajouter', employeController.ajouterEmploye);
router.get('/modifier/:id', async (req, res) => {
    const employe = await Employe.findById(req.params.id);
    res.render('employes/modifier', { employe });
});
router.post('/modifier/:id', employeController.modifierEmploye);
router.get('/supprimer/:id', employeController.supprimerEmploye);

module.exports = router;
