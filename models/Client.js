// models/Client.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User"); // Import du modèle User

const ClientSchema = new Schema({
  adresse: { 
    type: String, 
    required: true,
    minlength: [10, 'L\'adresse doit comporter au moins 10 caractères'], 
    maxlength: [200, 'L\'adresse doit comporter au maximum 200 caractères'], 
    validate: {
      validator: function(value) {
        return /\d/.test(value) && /[A-Za-z]/.test(value);
      },
      message: 'L\'adresse doit contenir un numéro et un nom de rue valides'
    }
  }
});

// Enregistrement du modèle Client
const Client = User.discriminator("client", ClientSchema);

module.exports = Client;
