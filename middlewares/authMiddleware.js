const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Le modèle User
const router = express.Router();

const app = express();
app.use(cookieParser()); // Utilisation de cookieParser une seule fois dans l'application

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

    // Répondre avec le token (Stocké aussi dans un cookie)
    res.cookie('token', token, {
      httpOnly: true, // Empêche l'accès au cookie via JavaScript
      secure: process.env.NODE_ENV === 'production', // Sécurise en production (HTTPS)
      maxAge: 3600 * 1000, // Durée de validité du cookie (1 heure)
    });

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

    // Répondre avec le token et le stocker dans un cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 * 1000,
    });

    res.status(200).json({
      message: 'Connexion réussie',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware de vérification du token
const verifyToken = (req, res, next) => {
  // Vérifier dans l'en-tête 'Authorization' ou dans les cookies
  const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : req.cookies.token;
  // Si le token est manquant, retourner une erreur
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

// Middleware pour vérifier le rôle de l'utilisateur
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    // Vérifier si le rôle de l'utilisateur est autorisé
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès interdit. Rôle insuffisant.' });
    }
    next(); // Si le rôle est autorisé, passer au prochain middleware ou à la route
  };
};

// Routes protégées par token et rôle
router.get('/client', verifyToken, authorizeRole('client', 'admin'), (req, res) => {
  res.status(200).json({ message: 'Accès autorisé pour le client.' });
});

router.get('/employe', verifyToken, authorizeRole('employe', 'admin'), (req, res) => {
  res.status(200).json({ message: 'Accès autorisé pour l\'employé.' });
});

router.get('/admin', verifyToken, authorizeRole('admin'), (req, res) => {
  res.status(200).json({ message: 'Accès autorisé pour l\'administrateur.' });
});

module.exports = { verifyToken, authorizeRole, router };































/*
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Le modèle User
const router = express.Router();

const app = express();
app.use(cookieParser()); // Utilisation de cookieParser une seule fois dans l'application

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

    // Répondre avec le token (Stocké aussi dans un cookie)
    res.cookie('token', token, {
      httpOnly: true, // Empêche l'accès au cookie via JavaScript
      secure: process.env.NODE_ENV === 'production', // Sécurise en production (HTTPS)
      maxAge: 3600 * 1000, // Durée de validité du cookie (1 heure)
    });

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

    // Répondre avec le token et le stocker dans un cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 * 1000,
    });

    res.status(200).json({
      message: 'Connexion réussie',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware de vérification du token
const verifyToken = (req, res, next) => {
  // Vérifier dans l'en-tête 'Authorization' ou dans les cookies
  const token = req.header('Authorization') || req.cookies.token;

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

// Middleware pour vérifier le rôle de l'utilisateur
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès interdit. Rôle insuffisant.' });
    }
    next(); // Si le rôle est autorisé, passer au prochain middleware ou à la route
  };
};

// Routes protégées par token et rôle
router.get('/client', verifyToken, authorizeRole('client', 'admin'), (req, res) => {
  res.status(200).json({ message: 'Accès autorisé pour le client.' });
});

router.get('/employe', verifyToken, authorizeRole('employe', 'admin'), (req, res) => {
  res.status(200).json({ message: 'Accès autorisé pour l\'employé.' });
});

router.get('/admin', verifyToken, authorizeRole('admin'), (req, res) => {
  res.status(200).json({ message: 'Accès autorisé pour l\'administrateur.' });
});

module.exports = { verifyToken, authorizeRole, router };
*/