const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route pour l'inscription
router.post("/signup", authController.signUp);

// Route pour la connexion
router.post("/signin", authController.signIn);

// Route pour la déconnexion (GET est acceptable, mais POST ou DELETE pourrait être plus RESTful)
router.get("/signout", authController.signOut);

// Export des routes
module.exports = router;
