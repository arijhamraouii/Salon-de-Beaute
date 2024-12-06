const Client = require('../models/Client');

// Afficher tous les clients
exports.afficherClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.render('clients/index', { clients });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'affichage des clients." });
    }
};

// Ajouter un nouveau client
exports.ajouterClient = async (req, res) => {
    try {
        // Récupération de toutes les données envoyées par le formulaire
        const { nom, prenom, email, telephone, adresse, password } = req.body;

        // Crée un nouvel utilisateur avec le rôle 'client'
        const nouveauClient = new Client({
            nom,
            prenom,
            email,
            telephone,
            password, 
            role: 'client',
            adresse,
        });

        // Sauvegarde du client
        await nouveauClient.save();

        // Redirection vers la page d'affichage des clients après ajout
        res.redirect('clients/ajouter');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'ajout du client." });
    }
};

// Modifier un client
exports.modifierClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, email, telephone, adresse } = req.body;

        // Mise à jour de tous les champs du client
        await Client.findByIdAndUpdate(id, {
            nom,
            prenom,
            email,
            telephone,
            adresse,
        });

        // Redirection vers la page d'affichage des clients après modification
        res.redirect('clients/modifier');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la modification du client." });
    }
};


// Supprimer un client
exports.supprimerClient = async (req, res) => {
    try {
        const { id } = req.params;
        await Client.findByIdAndDelete(id);
        res.redirect('clients/index');
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression du client." });
    }
};
