require('dotenv').config(); // Charge les variables d'environnement depuis le fichier .env
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
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

// Utilisation de method-override pour supporter PUT et DELETE via des formulaires HTML
app.use(methodOverride('_method'));

const authRoutes = require('./routes/authRoutes'); // Routes d'authentification

// Middleware pour les routes d'authentification
app.use('/api/auth', authRoutes);

// Définir le moteur de vues (EJS)
app.set('views', path.join(__dirname, 'views'));  // Le répertoire contenant les vues
app.set('view engine', 'ejs');

/*
// Routes
const serviceRoutes = require('./routes/serviceRoute'); // Routes pour les services
const employeRoutes = require('./routes/employeRoute'); // Routes pour les employés
const rendezvousRoutes = require('./routes/rendezvousRoute'); // Routes pour les rendez-vous
const factureRoutes = require('./routes/factureRoute'); // Routes pour les factures
const authRoutes = require('./routes/authRoutes'); // Routes d'authentification
*/

/*
// Middleware pour les autres routes
app.use('/api/services', serviceRoutes);
app.use('/api/employes', employeRoutes);
app.use('/api/rendezvous', rendezvousRoutes);
app.use('/api/factures', factureRoutes);
*/

// Exemple de route d'affichage de la page service.ejs
app.get('/services', (req, res) => {
  res.render('pages/service'); // Assurez-vous que le fichier service.ejs existe dans views/pages
});

app.get('/employes', (req, res) => {
  res.render('pages/employe'); // Assurez-vous que le fichier employe.ejs existe dans views/pages
});

app.get('/rendezvous', (req, res) => {
  res.render('pages/rendezvous'); // Assurez-vous que le fichier rendezvous.ejs existe dans views/pages
});

app.get('/factures', (req, res) => {
  res.render('pages/facture'); // Assurez-vous que le fichier facture.ejs existe dans views/pages
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur est en écoute sur le port ${PORT}`);
});