// controllers/rendezvousController.js
const Rendezvous = require('../models/Rendezvous');

// Planifier un nouveau rendez-vous
exports.planifierRendezvous = async (req, res) => {
  try {
    const { clientId, employeId, serviceId, date } = req.body;
    const nouveauRendezvous = new Rendezvous({ clientId, employeId, serviceId, date });
    await nouveauRendezvous.save();
    res.status(201).json({ message: "Rendez-vous planifié avec succès", rendezvous: nouveauRendezvous });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la planification du rendez-vous", details: error });
  }
};

// Modifier un rendez-vous
exports.modifierRendezvous = async (req, res) => {
  try {
    const rendezvous = await Rendezvous.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rendezvous) return res.status(404).json({ error: "Rendez-vous non trouvé" });
    res.status(200).json({ message: "Rendez-vous modifié", rendezvous });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la modification du rendez-vous", details: error });
  }
};

// Annuler un rendez-vous
exports.annulerRendezvous = async (req, res) => {
  try {
    const rendezvous = await Rendezvous.findByIdAndUpdate(req.params.id, { statut: 'annulé' }, { new: true });
    if (!rendezvous) return res.status(404).json({ error: "Rendez-vous non trouvé" });
    res.status(200).json({ message: "Rendez-vous annulé", rendezvous });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de l'annulation du rendez-vous", details: error });
  }
};
