const Catalogue = require('../models/Catalogue');

// Afficher tous les catalogues
exports.afficherCatalogues = async (req, res) => {
    try {
        const catalogues = await Catalogue.find();
        res.render('catalogues/index', { catalogues }); // Suppression de l'extension .html
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'affichage des catalogues." });
    }
};

// Ajouter un nouveau catalogue
exports.ajouterCatalogue = async (req, res) => {
    try {
        const { nom, description, prix, image } = req.body;
        const nouveauCatalogue = new Catalogue({ nom, description, prix, image });
        await nouveauCatalogue.save();
        res.redirect('/catalogues/ajouter'); // Redirection vers la liste des catalogues
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'ajout du catalogue." });
    }
};

// Modifier un catalogue
exports.modifierCatalogue = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description, prix, image } = req.body;
        await Catalogue.findByIdAndUpdate(id, { nom, description, prix, image });
        res.redirect('/catalogues/modifier'); // Redirection vers la liste des catalogues
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la modification du catalogue." });
    }
};

// Supprimer un catalogue
exports.supprimerCatalogue = async (req, res) => {
    try {
        const { id } = req.params;
        await Catalogue.findByIdAndDelete(id);
        res.redirect('/catalogues/index'); // Redirection vers la liste des catalogues
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression du catalogue." });
    }
};
