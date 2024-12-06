const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Client = require('../models/Client');
const Employe = require('../models/Employe');
const Admin = require('../models/Admin');  // Remplacé "Gerant" par "Admin"
require('dotenv').config(); // Assurez-vous que dotenv est configuré correctement

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("La clé JWT_SECRET est manquante.");
}

// Fonction pour générer un token JWT
const generateToken = (user) => {
    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET, // Utilisez la clé d'accès ici
        { expiresIn: "1h" }
    );
    return token; // Retourne le token pour l'utiliser ailleurs
};

// Méthode de connexion - signIn
exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    // Vérification des champs requis
    if (!email || !password) {
        return res.status(400).json({ message: "L'email et le mot de passe sont requis." });
    }

    try {
        // Recherche de l'utilisateur par son email dans les différents rôles
        let user = await Admin.findOne({ email }) || await Client.findOne({ email }) || await Employe.findOne({ email });

        // Vérification du mot de passe
        if (user && await bcrypt.compare(password, user.password)) {
           
            // Génération du token
            const token = generateToken(user);

            // Sauvegarde du token dans un cookie
            res.cookie("token", token, {
                httpOnly: true, // Le cookie ne sera accessible que par le serveur
                maxAge: 3600000, // 1 heure
                secure: false // Définir sur true si le site est en HTTPS
            });

            // Redirection ou réponse en fonction du rôle de l'utilisateur
            if (user.role === "admin") {
                return res.redirect("dashboard");
            } else if (user.role === "employe") {
                return res.status(200).json({ message: "Bienvenue employé" });
            } else {
                return res.status(200).json({ message: "Bienvenue client" });
            }
        } else {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Méthode d'inscription - signUp
exports.signUp = async (req, res) => {
    const { nom, prenom, email, password, role, adresse, telephone, experience, specialite, disponibilites } = req.body;

    // Vérification des champs requis
    if (!nom || !prenom || !email || !password || !role || !telephone) {
        return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    // Validation spécifique en fonction du rôle
    if (role === "admin" && !experience) {
        return res.status(400).json({ message: "L'expérience est requise pour le rôle d'admin." });
    }

    if (role === "employe" && (!specialite || !disponibilites)) {
        return res.status(400).json({ message: "La spécialité et les disponibilités sont requises pour le rôle d'employé." });
    }

    if (role === "client" && !adresse) {
        return res.status(400).json({ message: "L'adresse est requise pour le rôle de client." });
    }

    try {
        // Vérification du rôle valide
        if (!["client", "employe", "admin"].includes(role)) {
            throw new Error("Rôle invalide. Le rôle doit être 'client', 'employe' ou 'admin'.");
        }

        // Vérification si l'email existe déjà
        const roles = { client: Client, employe: Employe, admin: Admin };
        const existingUser = await roles[role].findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé. Veuillez choisir un autre." });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur en fonction du rôle
        let newUser;
        if (role === "client") {
            newUser = new Client({
                nom, prenom, email, password: hashedPassword, role, adresse, telephone
            });
        } else if (role === "employe") {
            newUser = new Employe({
                nom, prenom, email, password: hashedPassword, role, telephone, specialite, disponibilites
            });
        } else if (role === "admin") {
            newUser = new Admin({
                nom, prenom, email, password: hashedPassword, role, telephone, experience
            });
        }

        // Sauvegarde de l'utilisateur dans la base de données
        await newUser.save();

        // Génération du token après la création
        const token = generateToken(newUser);
        res.status(201).json({ message: "Utilisateur créé avec succès.", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Méthode de déconnexion - signOut
exports.signOut = async (req, res) => {
    try {
        // Suppression du cookie du token
        res.clearCookie("token", { httpOnly: true });

        // Redirection vers la page de connexion
        res.redirect("/login.ejs");
    } catch (error) {
        res.status(500).json({ message: "La déconnexion a échoué." });
    }
};
