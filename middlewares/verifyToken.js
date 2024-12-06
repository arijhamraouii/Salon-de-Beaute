// Assurez-vous que dotenv est chargé pour les variables d'environnement
require('dotenv').config();

const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    // Récupère le jeton d'autorisation à partir des en-têtes ou des cookies
    const bearerHeader = req.headers["authorization"] || req.cookies.token;

    // Si aucun jeton n'est trouvé
    if (!bearerHeader || typeof bearerHeader !== "string") {
        return res.status(401).json({ message: "Non autorisé - Jeton manquant" });
    }

    let bearerToken = bearerHeader;

    // Si le jeton commence par "Bearer ", on le sépare pour extraire la valeur
    if (bearerHeader.startsWith("Bearer ")) {
        bearerToken = bearerHeader.split(" ")[1];
    }

    // Ajoute le jeton à la requête pour l'utiliser dans d'autres parties de l'application
    req.token = bearerToken;

    // Vérifie la validité du jeton avec la clé secrète
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Afficher l'erreur pour faciliter le débogage
            return res.status(401).json({ message: "Non autorisé - Jeton invalide", error: err.message });
        }

        // Si le jeton est valide, on récupère l'identifiant de l'utilisateur depuis le décodage
        req.userId = decoded.user;

        // Passe le contrôle au prochain middleware ou à la route
        next();
    });
}

module.exports = verifyToken;
