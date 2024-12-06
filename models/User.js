const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nom: { 
    type: String, 
    required: true,
    minlength: [2, 'Le nom doit comporter au moins 2 caractères'],
    maxlength: [50, 'Le nom doit comporter au maximum 50 caractères']
  },
  prenom: { 
    type: String, 
    required: true,
    minlength: [2, 'Le prénom doit comporter au moins 2 caractères'],
    maxlength: [50, 'Le prénom doit comporter au maximum 50 caractères']
  },
  telephone: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(value) {
        return /^[+33]{3}\s[0-9]{1}\s[0-9]{2}\s[0-9]{2}\s[0-9]{2}\s[0-9]{2}$/.test(value);
      },
      message: 'Le numéro de téléphone doit être au format +33 X XX XX XX XX'
    }
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(value) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: 'L\'email doit être au format valide'
    }
  },
  password: { 
    type: String, 
    required: true,
    minlength: [6, 'Le mot de passe doit comporter au moins 6 caractères'],
    maxlength: [100, 'Le mot de passe doit comporter au maximum 100 caractères']
  },
  role: { 
    type: String, 
    enum: ['client', 'employe', 'admin'], 
    required: true 
  }
}, {
  discriminatorKey: 'role',
  timestamps: true
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
