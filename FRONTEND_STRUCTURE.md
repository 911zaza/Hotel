# Grand Hotel - Navigation Complète

## 🏠 Pages pour LES CLIENTS

### 1. **Home** (`/`)
   - Accueil avec à-propos et présentation de l'hôtel
   - Tendances et attractions
   - Boutons d'accès vers Chambres et Restaurant

### 2. **Login** (`/login`)
   - Formulaire de connexion
   - Inscription rapide

### 3. **Register** (`/register`)
   - Formulaire d'enregistrement
   - Champs: username, email, password, name, phone, address

### 4. **Explore (Chambres)** (`/explore`)
   - Affichage de toutes les chambres disponibles
   - Recherche et filtrage par type/numéro
   - Images SVG des chambres
   - Dialog de détails + bouton "Réserver"

### 5. **Réservations** (`/reservations`) ⭐ REQUIERT AUTHENTIFICATION
   - Voir toutes les réservations de l'utilisateur
   - Bouton "Télécharger PDF" pour chaque réservation
   - Bouton "Annuler" réservation
   - Créer une nouvelle réservation
   - **PDF généré** après confirmation

### 6. **Restaurant** (`/restaurant`)
   - Affichage de tous les plats disponibles
   - Commande de plats avec quantité
   - Sélection de la date du repas
   - **PDF généré** après confirmation de la commande

### 7. **Événements** (`/evenements`)
   - Affichage de tous les événements
   - Affichage de la date, durée et prix
   - Bouton "Réserver" pour chaque événement (à implémenter complet)

### 8. **Profil** (`/profile`) ⭐ REQUIERT AUTHENTIFICATION
   - Affichage du profil utilisateur
   - Modification des informations (name, email, phone, address)
   - Avatar avec initiales
   - Sauvegarde des changements

---

## 👨‍💼 Pages pour LES ADMINS (+ toutes les pages client)

### 1. **Gestion Chambres** (`/rooms`) ⭐ ADMIN ONLY
   - Tableau de toutes les chambres
   - Ajouter une nouvelle chambre
   - Modifier une chambre
   - Supprimer une chambre
   - Champs: numéro, type (single/double/suite), prix

### 2. **Gestion Clients** (`/clients`) ⭐ ADMIN ONLY
   - Liste de tous les clients
   - Ajouter un nouveau client
   - Modifier informations client
   - Supprimer un client

### 3. **Gestion Restaurant** (DANS `/restaurant`)
   - **Admins voient:**
     - Boutons "Ajouter Plat", "Modifier", "Supprimer"
     - Dialog avec formulaire pour créer/modifier plat
   - **Clients voient:**
     - Boutton "Commander" uniquement

### 4. **Gestion Événements** (DANS `/evenements`)
   - **Admins voient:**
     - Boutons "Ajouter Événement", "Modifier", "Supprimer"
     - Dialog avec formulaire pour créer/modifier événement
   - **Clients voient:**
     - Bouton "Réserver" uniquement

---

## 📱 Barre de Navigation

### Pour Non-Authentifiés:
- Logo (Home)
- Chambres (Explorer)
- Restaurant
- Événements
- **Se connecter** (bouton)

### Pour Clients Authentifiés:
- Logo (Home)
- Chambres (Explorer)
- Restaurant
- Événements
- Mes Réservations
- Profil
- **Déconnexion** (bouton)

### Pour Admins Authentifiés:
- Logo (Home)
- Chambres (Explorer)
- Restaurant
- Événements
- Gestion Chambres ⭐ ADMIN
- Clients ⭐ ADMIN
- Mes Réservations
- Profil
- **Déconnexion** (bouton)

---

## 🔒 Système d'Authentification

- **Login/Register**: Token stocké en localStorage
- **Role-based Access**: 
  - `role: "client"` par défaut
  - `role: "admin"` pour les administrateurs
- **Protected Routes**:
  - PrivateRoute: Authentification requise
  - AdminRoute: Authentification + Admin role requis

---

## 📄 Génération de PDF

✅ **Implémentée avec jsPDF + jsPDF-AutoTable**

### Réservations PDF
- Informations du client
- Détails de la chambre
- Dates (check-in / check-out)
- Prix par nuit
- Téléchargement automatique

### Commandes PDF
- Informations du client
- Nom du plat
- Quantité commandée
- Prix unitaire et total
- Dates (commande / repas)
- Téléchargement automatique

---

## 🗄️ API Endpoints Backend

### Auth
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
- `GET /auth/me` - Utilisateur actuel
- `POST /auth/logout` - Déconnexion

### Chambres
- `GET /rooms` - Toutes les chambres
- `POST /rooms` - Créer (ADMIN)
- `PUT /rooms/{id}` - Modifier (ADMIN)
- `DELETE /rooms/{id}` - Supprimer (ADMIN)

### Clients
- `GET /clients` - Tous les clients
- `POST /clients` - Créer
- `PUT /clients/{id}` - Modifier
- `DELETE /clients/{id}` - Supprimer (ADMIN)

### Réservations
- `GET /reservations` - Toutes
- `POST /reservations` - Créer
- `GET /reservations/client/{id}` - Par client
- `DELETE /reservations/{id}/client/{clientId}` - Annuler

### Restaurant (Plats)
- `GET /plats` - Tous les plats
- `POST /plats` - Créer (ADMIN)
- `PUT /plats/{id}` - Modifier (ADMIN)
- `DELETE /plats/{id}` - Supprimer (ADMIN)

### Commandes
- `GET /commandes` - Toutes
- `POST /commandes` - Créer
- `GET /commandes/client/{id}` - Par client
- `DELETE /commandes/{id}` - Supprimer

### Événements
- `GET /evenements` - Tous
- `POST /evenements` - Créer (ADMIN)
- `PUT /evenements/{id}` - Modifier (ADMIN)
- `DELETE /evenements/{id}` - Supprimer (ADMIN)

---

## 🎨 Design & Styling

- **Framework UI**: Material-UI (MUI 7.3.6)
- **Responsive Design**: Mobile-first avec Grid system
- **Icons**: Emojis + MUI Icons
- **Colors**: Dégradés bleus, couleurs primaires/secondaires

---

## ✅ Fichiers Créés/Modifiés

### Pages Créées
- ✅ `src/pages/RestaurantPage.jsx` - Gestion et commande de plats
- ✅ `src/pages/EvenementPage.jsx` - Gestion et réservation d'événements

### Pages Modifiées
- ✅ `src/pages/HomePage.jsx` - Ajout tendances et attractions
- ✅ `src/pages/ReservationsPage.jsx` - Ajout téléchargement PDF
- ✅ `src/App.js` - Nouvelles routes
- ✅ `src/components/Header.jsx` - Nouveaux liens navigation

### Composants Créés
- ✅ `src/components/PlatForm.jsx` - Formulaire plat
- ✅ `src/components/EvenementForm.jsx` - Formulaire événement

### Configuration
- ✅ `package.json` - Ajout jsPDF + jsPDF-AutoTable
- ✅ `models.py` - Correction type duree_evenement (String)
- ✅ `controllers.py` - Simplification handlers événement
- ✅ `dto.py` - Alignement types DTO

---

## 🚀 Prochaines Étapes

1. **npm install** - Installer les packages (jsPDF)
2. **npm start** - Tester l'application
3. **Testing** - Tester login, chambre, restaurant, commandes, réservations PDF
4. **Backend** - Vérifier tous les endpoints fonctionnent
5. **Production** - npm run build

---

**Version**: 2.0 - Complete Hotel Management System
**Date**: January 2026
