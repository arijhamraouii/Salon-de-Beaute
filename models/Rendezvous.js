// models/Rendezvous.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Client = require("./Client");  // Vérifiez l'import ici
const Employe = require("./Employe");
const Catalogue = require("./Catalogue");

const RendezvousSchema = new Schema({
  client: { 
    type: Schema.Types.ObjectId, 
    ref: 'Client', // Référence au modèle Client
    required: true
  },
  employe: { 
    type: Schema.Types.ObjectId, 
    ref: 'Employe',
    validate: {
      validator: function(value) {
        return mongoose.Types.ObjectId.isValid(value);
      },
      message: 'L\'ID de l\'employé n\'est pas valide'
    }
  },
  date: { 
    type: Date, 
    required: true
  },
  catalogue: { 
    type: Schema.Types.ObjectId, 
    ref: 'Catalogue', 
    required: true
  }
});

const Rendezvous = mongoose.model("Rendezvous", RendezvousSchema);
module.exports = Rendezvous;
