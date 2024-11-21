// models/Rendezvous.js
const mongoose = require('mongoose');

const rendezvousSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  employeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employe',
    required: true
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  statut: {
    type: String,
    enum: ['confirmé', 'annulé', 'terminé'],
    default: 'confirmé'
  }
}, { timestamps: true });

const Rendezvous = mongoose.model('Rendezvous', rendezvousSchema);
module.exports = Rendezvous;
