
require('dotenv').config(); // Charge les variables d'environnement depuis le fichier .env
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Routes d'authentification
const app = express();

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost/salon-de-beaute', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connexion à la base de données réussie'))
  .catch((error) => console.log('Erreur de connexion:', error));

// Middleware pour parser les données JSON dans le corps des requêtes
app.use(bodyParser.json());

// Utilisation des routes d'authentification
app.use('/api/auth', authRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
















/*

require('dotenv').config(); // Charge les variables d'environnement depuis le fichier .env
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware pour parser les données JSON dans le corps des requêtes
app.use(express.json()); // Utilisation d'express.json() pour parser les données JSON

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/salon-de-beaute', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connexion à la base de données réussie'))
  .catch((error) => console.log('Erreur de connexion:', error));

// Routes d'authentification
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Routes des services
const serviceRoutes = require('./routes/serviceRoute'); // Assure-toi que ce chemin est correct
app.use('/api/services', serviceRoutes);

// Routes des factures
const factureRoutes = require('./routes/factureRoute'); // Assure-toi que ce chemin est correct
app.use('/api/factures', factureRoutes);

// Routes des rendez-vous
const rdvRoutes = require('./routes/rdvRoute'); // Assure-toi que ce chemin est correct
app.use('/api/rendezvous', rdvRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur est en écoute sur le port ${PORT}`);
});




*/