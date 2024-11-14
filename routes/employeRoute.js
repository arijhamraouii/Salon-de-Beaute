
let express = require("express");
let router = express.Router();

// Exemple de route GET pour obtenir la liste des employés
router.get("/", (req, res) => {
  res.send("Liste de tous les employés");
});

// Exemple de route POST pour ajouter un employé
router.post("/add", (req, res) => {
  res.send("Ajout d'un employé");
});

module.exports = router;
