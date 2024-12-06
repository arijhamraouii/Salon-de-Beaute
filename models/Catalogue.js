// models/Catalogue.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatalogueSchema = new Schema({
  nom: { 
    type: String, 
    required: true,
    minlength: [3, 'Le nom doit comporter au moins 3 caractères'],  // Validation pour la longueur minimale
    maxlength: [100, 'Le nom doit comporter au maximum 100 caractères'] // Validation pour la longueur maximale
  },
  description: { 
    type: String, 
    required: true,
    minlength: [10, 'La description doit comporter au moins 10 caractères'],  // Validation pour la longueur minimale
    maxlength: [500, 'La description doit comporter au maximum 500 caractères'] // Validation pour la longueur maximale
  },
  prix: { 
    type: Number, 
    required: true,
    min: [0, 'Le prix ne peut pas être inférieur à 0'], // Validation pour un prix positif
    validate: {
      validator: function(value) {
        return Number.isFinite(value);  // Vérifie si le prix est un nombre
      },
      message: 'Le prix doit être un nombre valide'
    }
  },
  promotion: { 
    type: String, 
    default: null,
    validate: {
      validator: function(value) {
        // Si une promotion est fournie, elle doit être un code de promotion valide
        return value === null || /^[A-Z0-9]{5,10}$/.test(value);  // Exemple de validation pour un code promotionnel alphanumérique
      },
      message: 'Le code de promotion doit être alphanumérique et comporter entre 5 et 10 caractères'
    }
  },
  disponibilite: { 
    type: Boolean, 
    default: true 
  }
});

const Catalogue = mongoose.model("Catalogue", CatalogueSchema);
module.exports = Catalogue;
