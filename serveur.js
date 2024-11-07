
const express = require("express");

// Initialisation de l'application Express
const app = express();
const PORT = 5000;

// Middleware pour analyser le JSON
app.use(express.json());

// Routes pour la gestion des clients
app.get("/api/clients", (req, res) => {
  res.send("Liste de tous les clients");
});
app.post("/api/clients/add", (req, res) => {
  res.send("Ajout d'un client");
});
app.get("/api/clients/:id", (req, res) => {
  res.send(`Informations sur le client avec l'ID ${req.params.id}`);
});

// Routes pour la gestion des employés
app.get("/api/employes", (req, res) => {
  res.send("Liste de tous les employés");
});
app.post("/api/employes/add", (req, res) => {
  res.send("Ajout d'un employé");
});

// Routes pour la gestion des services
app.get("/api/services", (req, res) => {
  res.send("Liste de tous les services");
});
app.post("/api/services/add", (req, res) => {
  res.send("Ajout d'un service");
});

// Routes pour la gestion des factures
app.get("/api/factures", (req, res) => {
  res.send("Liste de toutes les factures");
});
app.post("/api/factures/add", (req, res) => {
  res.send("Création d'une facture");
});

// Routes pour la gestion des rendez-vous
app.get("/api/rendezvous", (req, res) => {
  res.send("Liste de tous les rendez-vous");
});
app.post("/api/rendezvous/add", (req, res) => {
  res.send("Ajout d'un rendez-vous");
});

// Route par défaut
app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur de gestion de salon !");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
