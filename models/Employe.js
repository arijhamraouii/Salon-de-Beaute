const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const EmployeSchema = new Schema({
  specialite: { 
    type: String, 
    required: true,
    minlength: [3, 'La spécialité doit comporter au moins 3 caractères'],
    maxlength: [100, 'La spécialité doit comporter au maximum 100 caractères']
  },
  disponibilites: [{
    type: String,
    validate: {
      validator: function(value) {
        return /^[A-Za-zéèà]{3,10}$/.test(value);
      },
      message: 'La disponibilité doit être un jour de la semaine valide (ex: Lundi, Mardi, etc.)'
    }
  }]
});

const Employe = User.discriminator("employe", EmployeSchema);
module.exports = Employe;
