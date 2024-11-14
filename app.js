require('dotenv').config(); // Charge les variables d'environnement depuis le fichier .env
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Routes d'authentification
//const { protect } = require('./middleware/authMiddleware');
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
