// models/Facture.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FactureSchema = new Schema({
  rendezvousId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Rendezvous', 
    required: true 
  },
  montant: { 
    type: Number, 
    required: true,
    min: [0, 'Le montant ne peut pas être inférieur à 0'], // Validation pour un montant positif
    validate: {
      validator: function(value) {
        return Number.isFinite(value);  // Vérifie que le montant est un nombre valide
      },
      message: 'Le montant doit être un nombre valide'
    }
  },
  statut: { 
    type: String, 
    enum: ['payé', 'en attente', 'annulé'], 
    default: 'en attente', 
    required: true // Statut requis
  },
  dateFacture: { 
    type: Date, 
    default: Date.now,
    validate: {
      validator: function(value) {
        return value instanceof Date && !isNaN(value.getTime()); // Validation pour une date valide
      },
      message: 'La date de la facture doit être une date valide'
    }
  }
});

const Facture = mongoose.model("Facture", FactureSchema);
module.exports = Facture;
