const Rendezvous = require('../models/Rendezvous');
const Client = require('../models/Client');
const Employe = require('../models/Employe');
const Catalogue = require('../models/Catalogue');

// Fonction pour afficher la liste des rendez-vous
exports.afficherRendezvous = async (req, res) => {
  try {
    // Récupération de tous les rendez-vous avec les informations des clients, employés et catalogues
    const rendezvousList = await Rendezvous.find()
      .populate('client', 'nom prenom')  // Peupler le client avec les champs nom, prenom et adresse
      .populate('employe', 'nom prenom')  // Peupler l'employé avec les champs nom, prenom et spécialité
      .populate('catalogue', 'nom');  // Peupler le catalogue avec le champ nom

    res.render('rendezvous/index', {
      rendezvous: rendezvousList,  // Passer les rendez-vous à la vue
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'affichage des rendez-vous.", error: error.message });
  }
};

// Ajouter un rendez-vous
exports.ajouterRendezvous = async (req, res) => {
  try {
    const { clientId, employeId, date, statut, catalogueId } = req.body;
    const nouveauRdv = new Rendezvous({ 
      client: clientId, 
      employe: employeId, 
      date, 
      statut,
      catalogue: catalogueId 
    });
    await nouveauRdv.save();
    res.redirect('/rendezvous');
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout du rendez-vous." });
  }
};

// Modifier un rendez-vous
exports.modifierRendezvous = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientId, employeId, date, statut, catalogueId } = req.body;
    await Rendezvous.findByIdAndUpdate(id, { 
      client: clientId, 
      employe: employeId, 
      date, 
      statut,
      catalogue: catalogueId 
    });
    res.redirect('/rendezvous');
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la modification du rendez-vous." });
  }
};

// Supprimer un rendez-vous
exports.supprimerRendezvous = async (req, res) => {
  try {
    const { id } = req.params;
    await Rendezvous.findByIdAndDelete(id);
    res.redirect('/rendezvous');
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du rendez-vous." });
  }
};
