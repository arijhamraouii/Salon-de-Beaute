const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken'); // Importation de JWT pour la gestion des tokens
const bcrypt = require('bcryptjs'); // Pour comparer les mots de passe hashés
const connectDB = require("./config/dbConfig");
require('dotenv').config();

const authRoutes = require("./routes/authRoute");
const clientRoutes = require("./routes/clientRoute");
const employeRoutes = require("./routes/employeRoute");
const catalogueRoutes = require("./routes/catalogueRoute");
const factureRoutes = require("./routes/factureRoute");
const rendezvousRoutes = require("./routes/rendezvousRoute");
const verifyToken = require("./middlewares/verifyToken");

const app = express();

// Middleware pour analyser les données envoyées avec le body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());

// Connexion à la base de données MongoDB
connectDB();

// Configuration des vues EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve les fichiers statiques depuis le dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page de login
app.get("/login", (req, res) => {
    res.render("login");
});

// Route pour le dashboard, accessible uniquement pour les utilisateurs avec le rôle 'admin'
app.get("/dashboard", (req, res) => {
    const token = req.cookies.token;  // Vérification du token dans les cookies
    if (!token) {
        return res.redirect("/login");  // Redirige vers le login si aucun token n'est trouvé
    }

    // Vérifier et décoder le token pour obtenir l'utilisateur et son rôle
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.redirect("/login");  // Redirige vers le login en cas d'erreur de vérification du token
        }

        // Si le token est valide, on vérifie le rôle de l'utilisateur
        if (decoded.role === "admin") {
            res.render("dashboard", { role: "admin" });  // Affiche le dashboard si l'utilisateur est admin
        } else {
            res.redirect("/login");  // Redirige vers le login si l'utilisateur n'est pas un admin
        }
    });
});

// Route pour gérer la soumission du formulaire de login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Chercher l'utilisateur dans la base de données
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("Utilisateur non trouvé");
        }

        // Comparer le mot de passe avec celui stocké dans la base de données
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Mot de passe incorrect");
        }

        // Si l'utilisateur est un admin, créer un token et rediriger vers le dashboard
        if (user.role === "admin") {
            // Créer un JWT token
            const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Sauvegarder le token dans un cookie
            res.cookie("token", token, { httpOnly: true });

            // Rediriger l'admin vers le dashboard
            return res.redirect("/dashboard");
        } else {
            return res.status(400).send("Accès non autorisé");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur serveur");
    }
});

// Middleware pour vérifier si l'utilisateur a le rôle spécifié
const checkRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.redirect('/login');
    }
    next();
};

// Routes protégées par le rôle 'admin'
app.get("/clients/index", verifyToken, checkRole('admin'), (req, res) => res.render("clients/index"));
app.get("/employes/index", verifyToken, checkRole('admin'), (req, res) => res.render("employes/index"));
app.get("/catalogues/index", verifyToken, checkRole('admin'), (req, res) => res.render("catalogues/index"));
app.get("/factures/index", verifyToken, checkRole('admin'), (req, res) => res.render("factures/index"));
app.get("/rendezvous/index", verifyToken, checkRole('admin'), (req, res) => res.render("rendezvous/index"));

// Route de déconnexion pour effacer le token et rediriger vers la page de login
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

// Route d'accueil avec redirection en fonction de la présence du token
app.get("/", (req, res) => {
    const token = req.cookies.token;
    res.redirect(token ? "/dashboard" : "/login");
});

// Routes pour l'authentification et autres actions
app.use("/auth", authRoutes);
app.use("/clients", clientRoutes);
app.use("/employes", employeRoutes);
app.use("/catalogues", catalogueRoutes);
app.use('/factures', factureRoutes);
app.use("/rendezvous", rendezvousRoutes);

// Middleware global pour gérer les erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);  // Affiche l'erreur dans la console
    res.status(500).send("Quelque chose s'est mal passé !");  // Message d'erreur générique
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${PORT}`);
});
