// models/Facture.js
const mongoose = require('mongoose');

const factureSchema = new mongoose.Schema({
  rendezvousId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rendezvous',
    required: true
  },
  montant: {
    type: Number,
    required: true
  },
  statut: {
    type: String,
    enum: ['payé', 'en attente', 'annulé'],
    default: 'en attente'
  },
  dateFacture: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Facture = mongoose.model('Facture', factureSchema);
module.exports = Facture;
