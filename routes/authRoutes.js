
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Votre modèle User
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware'); // Importer le middleware de protection des routes
const router = express.Router();

// Route d'inscription (signup)
router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "L'email est déjà pris" });
    }

    // Rôle par défaut = client
    const newRole = role || 'client';

    // Créer un nouvel utilisateur
    const user = new User({ username, email, password, role: newRole });
    await user.save();

    // Créer un JWT pour l'utilisateur
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
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

// Route de connexion (login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Créer le token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
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

// Route protégée pour client (accès uniquement pour client, employé, et admin)
router.get('/client', verifyToken, authorizeRole('client', 'employe', 'admin'), (req, res) => {
  res.status(200).json({ message: 'Accès autorisé pour le client', user: req.user });
});

// Route protégée pour employé (accès uniquement pour employé et admin)
router.get('/employe', verifyToken, authorizeRole('employe', 'admin'), (req, res) => {
  res.status(200).json({ message: 'Accès autorisé pour l\'employé', user: req.user });
});

// Route protégée pour administrateur (accès uniquement pour admin)
router.get('/admin', verifyToken, authorizeRole('admin'), (req, res) => {
  res.status(200).json({ message: 'Accès autorisé pour l\'administrateur', user: req.user });
});

module.exports = router;
