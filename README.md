# 💅 **Salon de Beauté - Gestion des Clients, Employés, Rendez-vous, Services et Factures**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![EJS](https://img.shields.io/badge/EJS-5D5F5F?style=for-the-badge&logo=ejs&logoColor=white)

---

## 🎯 **Description du Projet**

**Salon de Beauté** est une application de gestion pour un salon de beauté, développée avec **Node.js** et **Express.js** pour le backend et **MongoDB** pour la base de données. Le frontend utilise **Bootstrap** et **CSS** pour une interface utilisateur simple et responsive. L'application permet de gérer les **clients**, les **employés**, les **services**, les **rendez-vous**, et les **factures**.

### **Fonctionnalités Principales :**

- **Gestion des Clients** : Ajouter, modifier, supprimer et lister les clients.
- **Gestion des Employés** : Ajouter, modifier, supprimer et lister les employés.
- **Gestion des Services** : Ajouter, modifier, supprimer et lister les services proposés par le salon (par exemple, coupe de cheveux, soin de la peau, manucure, etc.).
- **Gestion des Rendez-vous** : Planification des rendez-vous entre clients et employés.
- **Gestion des Factures** : Création et gestion des factures pour les services rendus.

---

## 🛠️ **Architecture du Projet**

L'architecture repose sur une **architecture monolithique** avec un backend structuré en **contrôleurs** et **modèles**. 

- **Contrôleurs** : Chaque fonctionnalité (client, employé, service, rendez-vous, facture) dispose d'un contrôleur dédié. Les contrôleurs sont responsables de la gestion des requêtes HTTP, de la validation des données et de l'appel aux modèles pour interagir avec la base de données.
  
- **Modèles** : Les modèles définissent la structure des données et contiennent la logique pour interagir avec la base de données **MongoDB**. Chaque modèle correspond à une entité du système (par exemple, `Client`, `Employe`, `Service`, `Rendezvous`, `Facture`) et fournit des méthodes pour effectuer les opérations CRUD (Créer, Lire, Mettre à jour, Supprimer).

Les **contrôleurs** font appel aux **modèles** pour effectuer des actions sur la base de données, telles que la récupération, l'insertion ou la mise à jour des informations. L'API REST est construite autour de ces interactions.

---

## 💻 **Technologies Utilisées**

- **Backend** :
  - **Node.js** pour le runtime JavaScript.
  - **Express.js** pour créer l'API REST.
- **Base de Données** :
  - **MongoDB** pour stocker les informations des clients, employés, services, rendez-vous et factures.
- **Frontend** :
  - **Bootstrap** pour créer une interface utilisateur responsive.
  - **CSS** pour personnaliser les styles de l'application.
- **Test d'API** :
  - **Postman** pour tester les endpoints de l'API.

---


## 🚀 **Installation**

### 1. Clonez le Repository

```bash
git clone https://github.com/votre-utilisateur/salon-de-beaute.git
cd salon-de-beaute
