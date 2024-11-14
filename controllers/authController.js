const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fonction pour inscrire un utilisateur et générer un token
const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Vérifier que tous les champs sont présents dans la requête
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis (name, email, password).' });
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'L\'utilisateur existe déjà.' });
    }

    // Si le rôle est défini, on l'utilise, sinon on attribue 'client' par défaut
    const newRole = role || 'client';

    // Créer un nouvel utilisateur
    const user = new User({ name, email, password, role: newRole });

    // Hachage du mot de passe avant de sauvegarder l'utilisateur
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Sauvegarder l'utilisateur
    await user.save();

    // Générer un token JWT après la création de l'utilisateur
    const token = user.generateAuthToken(); // Assurez-vous que cette méthode est présente dans le modèle User

    // Répondre avec le token
    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Fonction pour connecter un utilisateur et générer un token
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si le mot de passe est correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Générer un token JWT après la connexion
    const token = user.generateAuthToken(); // Assurez-vous que cette méthode est présente dans le modèle User

    // Répondre avec le token
    res.status(200).json({
      message: 'Connexion réussie',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { signup, login };
