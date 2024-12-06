const Facture = require('../models/Facture');

/// Afficher toutes les factures
exports.afficherFactures = async (req, res) => {
    try {
        // Récupération des factures avec les rendez-vous associés
        const factures = await Facture.find().populate('rendezvousId'); // Peupler avec les données du rendez-vous
        res.render('factures/index', { factures });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'affichage des factures." });
    }
};


// Ajouter une facture
exports.ajouterFacture = async (req, res) => {
    try {
        const { rendezvousId, montant, statut } = req.body;
        const nouvelleFacture = new Facture({ rendezvousId, montant, statut });
        await nouvelleFacture.save();
        res.redirect('factures/ajouter');
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout de la facture." });
    }
};




// Payer une facture
exports.payerFacture = async (req, res) => {
    try {
        const { id } = req.params;
        await Facture.findByIdAndUpdate(id, { statut: 'payé' });
        res.redirect('factures/modifier');
    } catch (error) {
        res.status(500).json({ error: "Erreur lors du paiement de la facture." });
    }
};
