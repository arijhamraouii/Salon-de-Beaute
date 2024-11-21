const Service = require('../models/Service');

// Ajouter un service (administrateur)
exports.ajouterService = async (req, res) => {
  try {
    // Vérification des données d'entrée
    const { nom, description, prix, promotion, options } = req.body;
    if (!nom || !description || !prix) {
      return res.status(400).json({ error: "Les champs nom, description et prix sont obligatoires." });
    }

    // Créer un nouveau service
    const nouveauService = new Service({ nom, description, prix, promotion, options });

    // Sauvegarder le service dans la base de données
    await nouveauService.save();
    res.status(201).json({ message: "Service ajouté avec succès", service: nouveauService });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de l'ajout du service", details: error.message });
  }
};

// Récupérer la liste des services
exports.listerServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la récupération des services", details: error.message });
  }
};

// Récupérer un service spécifique
exports.recupererService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service non trouvé" });
    res.status(200).json({ service });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la récupération du service", details: error.message });
  }
};

// Modifier un service (administrateur)
exports.modifierService = async (req, res) => {
  try {
    const { nom, description, prix, promotion, options } = req.body;
    if (!nom || !description || !prix) {
      return res.status(400).json({ error: "Les champs nom, description et prix sont obligatoires." });
    }

    const service = await Service.findByIdAndUpdate(req.params.id, { nom, description, prix, promotion, options }, { new: true });
    if (!service) return res.status(404).json({ error: "Service non trouvé" });

    res.status(200).json({ message: "Service mis à jour", service });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la mise à jour du service", details: error.message });
  }
};

// Supprimer un service (administrateur)
exports.supprimerService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: "Service non trouvé" });
    res.status(200).json({ message: "Service supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la suppression du service", details: error.message });
  }
};
