// models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  promotion: {
    type: String, // Par exemple : '10% OFF'
    default: null
  },
  options: [String] // Par exemple : ['Couleur de cheveux', 'Type de soins']
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
