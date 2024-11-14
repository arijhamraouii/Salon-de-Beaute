
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Le modèle User
// Commenter l'importation du middleware
// const { protect } = require('../middleware/authMiddleware'); 
const router = express.Router();

// Route d'inscription (avec rôle par défaut client, ou admin si nécessaire)
router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "L'email est déjà pris" });
    }

    // Si le rôle est défini, on l'utilise. Sinon, on attribue 'client' par défaut
    const newRole = role || 'client';

    // Créer un nouvel utilisateur
    const user = new User({ username, email, password, role: newRole });
    await user.save();

    // Créer un JWT pour l'utilisateur
    const token = jwt.sign({ id: user._id, role: user.role }, 'votre_secret_clé', {
      expiresIn: '1h',
    });

    // Répondre avec le token
    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si le mot de passe est correct
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Créer un token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, 'votre_secret_clé', {
      expiresIn: '1h',
    });

    // Répondre avec le token
    res.status(200).json({
      message: 'Connexion réussie',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Exemple de route sans protection (pour les tests sans le middleware protect)
router.get('/client', (req, res) => {
  res.status(200).json({ message: 'Accès autorisé pour le client' });
});

router.get('/employe', (req, res) => {
  res.status(200).json({ message: 'Accès autorisé pour l\'employé' });
});

router.get('/admin', (req, res) => {
  res.status(200).json({ message: 'Accès autorisé pour l\'administrateur' });
});








// Vérifier le token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: 'Accès interdit. Token manquant.' });
  }

  try {
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

    req.user = decoded; // On ajoute l'utilisateur au corps de la requête
    next(); // Passer au middleware suivant ou à la route
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
};

// Vérifier le rôle de l'utilisateur
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès interdit. Rôle insuffisant.' });
    }
    next(); // Si le rôle est autorisé, passer au prochain middleware ou à la route
  };
};

module.exports = { verifyToken, authorizeRole, router };
