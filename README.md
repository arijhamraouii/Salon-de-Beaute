# 💅 **Salon de Beauté - Gestion des Clients, Employés, Rendez-vous et Factures**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

---

## 🎯 **Description du Projet**

**Salon de Beauté** est une application de gestion pour un salon de beauté, développée avec **Node.js** et **Express.js** pour le backend et **MongoDB** pour la base de données. Le frontend utilise **Bootstrap** et **CSS** pour une interface utilisateur simple et responsive. L'application permet de gérer les **clients**, les **employés**, les **rendez-vous** et les **factures**.

### **Fonctionnalités Principales :**

- **Gestion des Clients** : Ajouter, modifier, supprimer et lister les clients.
- **Gestion des Employés** : Ajouter, modifier, supprimer et lister les employés.
- **Gestion des Rendez-vous** : Planification des rendez-vous entre clients et employés.
- **Gestion des Factures** : Création et gestion des factures pour les services rendus.

---

## 🛠️ **Architecture du Projet**

L'architecture repose sur une **architecture monolithique** avec un backend qui gère plusieurs services via **Express.js**. Chaque fonctionnalité (client, employé, rendez-vous, facture) est gérée par un service spécifique.

Voici un diagramme de l'architecture :

```mermaid
graph TD;
    A[Utilisateur] -->|Interagit avec l'interface| B[Frontend (Bootstrap + CSS)];
    B --> C[Backend (Node.js + Express)];
    C --> D{Services};
    D --> E[Service Client];
    D --> F[Service Employé];
    D --> G[Service Rendez-vous];
    D --> H[Service Facture];
    E --> I[MongoDB - Clients];
    F --> J[MongoDB - Employés];
    G --> K[MongoDB - Rendez-vous];
    H --> L[MongoDB - Factures];
