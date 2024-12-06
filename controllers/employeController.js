const Employe = require('../models/Employe');

// Afficher tous les employés
exports.afficherEmployes = async (req, res) => {
    try {
        const employes = await Employe.find();
        res.render('employes/index', { employes });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'affichage des employés." });
    }
};

// Ajouter un nouvel employé
exports.ajouterEmploye = async (req, res) => {
    try {
        const { nom, email, telephone, specialite, disponibilites } = req.body;
        const nouvelEmploye = new Employe({ nom, email, telephone, specialite, disponibilites });
        await nouvelEmploye.save();
        res.redirect('employes/ajouter');
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout de l'employé." });
    }
};

// Modifier un employé
exports.modifierEmploye = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, email, telephone, specialite, disponibilites } = req.body;
        await Employe.findByIdAndUpdate(id, { nom, email, telephone, specialite, disponibilites });
        res.redirect('employes/modifier');
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la modification de l'employé." });
    }
};

// Supprimer un employé
exports.supprimerEmploye = async (req, res) => {
    try {
        const { id } = req.params;
        await Employe.findByIdAndDelete(id);
        res.redirect('employes');
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de l'employé." });
    }
};
