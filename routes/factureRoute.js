
let express = require("express");
let router = express.Router();

// Exemple de route GET pour obtenir toutes les factures
router.get("/", (req, res) => {
  res.send("Liste de toutes les factures");
});

// Exemple de route POST pour créer une facture
router.post("/add", (req, res) => {
  res.send("Création d'une facture");
});

module.exports = router;
