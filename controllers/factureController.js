// controllers/factureController.js
const Facture = require('../models/Facture');

// Générer une facture pour un rendez-vous
exports.genererFacture = async (req, res) => {
  try {
    const { rendezvousId, montant } = req.body;
    const nouvelleFacture = new Facture({ rendezvousId, montant });
    await nouvelleFacture.save();
    res.status(201).json({ message: "Facture générée", facture: nouvelleFacture });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la génération de la facture", details: error });
  }
};

// Payer une facture
exports.payerFacture = async (req, res) => {
  try {
    const facture = await Facture.findByIdAndUpdate(req.params.id, { statut: 'payé' }, { new: true });
    if (!facture) return res.status(404).json({ error: "Facture non trouvée" });
    res.status(200).json({ message: "Facture payée", facture });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors du paiement de la facture", details: error });
  }
};
