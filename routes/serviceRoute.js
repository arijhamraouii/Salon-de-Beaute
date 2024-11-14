
let express = require("express");
let router = express.Router();

// Exemple de route GET pour obtenir la liste des services
router.get("/", (req, res) => {
  res.send("Liste de tous les services");
});

// Exemple de route POST pour ajouter un service
router.post("/add", (req, res) => {
  res.send("Ajout d'un service");
});

module.exports = router;
