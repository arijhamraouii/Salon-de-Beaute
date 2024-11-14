const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Utilisation de bcryptjs pour le hachage du mot de passe
const jwt = require('jsonwebtoken'); // Utilisation de jsonwebtoken pour générer un token JWT

// Définir le schéma pour l'utilisateur
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: false // Le champ "name" nest pas requis
  },
  email: { 
    type: String, 
    required: true, 
    unique: true // Le champ "email" est unique
  },
  password: { 
    type: String, 
    required: true // Le champ "password" est requis
  },
  role: { 
    type: String, 
    enum: ['client', 'employe', 'admin'],  // Les rôles autorisés
    default: 'client'  // Le rôle par défaut est "client"
  }
});

// Middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Si le mot de passe n'a pas été modifié, on passe à la suite
  const salt = await bcrypt.genSalt(10);  // Générer un "salt" pour le hachage
  this.password = await bcrypt.hash(this.password, salt); // Hacher le mot de passe
  next(); // Continuer l'enregistrement
});

// Méthode pour comparer les mots de passe (le mot de passe entré et celui dans la base de données)
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password); // Comparer le mot de passe entré avec celui haché
};

// Méthode pour générer un token JWT
userSchema.methods.generateAuthToken = function () {
  const payload = { id: this._id, role: this.role };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Le token expire dans 1 heure
};

const User = mongoose.model('User', userSchema);

module.exports = User;