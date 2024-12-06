const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const AdminSchema = new Schema({
  experience: { 
    type: Number, 
    required: false, 
    validate: {
      validator: function(value) {
        return value >= 0;  // Vérifie que l'expérience est un nombre positif
      },
      message: 'L\'expérience doit être un nombre positif'
    }
  }
});

// "admin" est le discriminant dans le modèle User
const Admin = User.discriminator("admin", AdminSchema);  // Le rôle "admin" comme discriminant
module.exports = Admin;
