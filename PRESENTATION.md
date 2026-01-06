# Présentation détaillée des fonctionnalités — Hotel Management System

Ce document décrit les fonctionnalités de chaque page frontend (React) et des endpoints backend (FastAPI).

---

## Frontend (React) — Pages et Fonctionnalités

### 1. **HomePage** (`hotel-ui/src/pages/HomePage.jsx`)
**Objectif**: Page d'accueil du site hôtel.

**Fonctionnalités**:
- Affiche un titre de bienvenue (« Bienvenue au Grand Hotel ») avec un sous-titre.
- Affiche un carrousel d'images hero (HeroSlider).
- Liste les **3 chambres les plus chères** de la base de données.
- Les chambres sont récupérées via l'API (`getRooms()`), triées par prix décroissant, et affichées sous forme de cartes.
- Chargement asynchrone avec état de chargement (« Chargement... »).
- Message vide si aucune chambre n'est disponible.

---

### 2. **ExplorePage** (`hotel-ui/src/pages/ExplorePage.jsx`)
**Objectif**: Parcourir et filtrer les chambres disponibles.

**Fonctionnalités**:
- Affiche la liste complète des chambres récupérées via l'API.
- **Recherche/Filtrage**: champ de recherche qui filtre les chambres par numéro ou type.
- Chaque chambre affiche :
  - Image (URL depuis la base de données ou placeholder).
  - Numéro et type de chambre.
  - Prix par nuit.
  - Badges (ex: type de chambre : Single, Double, Suite).
  - Boutons d'action : "Réserver" (modal), "Voir détails" (dialog).
- **Dialog de détails**: affiche les informations complètes d'une chambre sélectionnée.
- **Modal de réservation**: permet de réserver une chambre.
- Gestion des erreurs avec affichage de messages d'alerte.

---

### 3. **LoginPage** (`hotel-ui/src/pages/LoginPage.jsx`)
**Objectif**: Authentification des utilisateurs.

**Fonctionnalités**:
- Formulaire de connexion (username + password).
- Affichage du mot de passe cachable (toggle eye icon).
- Soumission du formulaire appelle l'API de login.
- Sauvegarde du token JWT et des informations utilisateur en localStorage.
- **Redirection automatique** selon le rôle :
  - Admin → page `/clients`.
  - Utilisateur normal → page `/explore`.
- Affichage des messages de succès/erreur.
- Lien vers la page d'inscription.

---

### 4. **RegisterPage** (`hotel-ui/src/pages/RegisterPage.jsx`)
**Objectif**: Inscription de nouveaux utilisateurs.

**Fonctionnalités**:
- Formulaire d'inscription avec champs : username, email, password, password confirmation.
- Validation du formulaire côté client.
- Appel à l'API de création d'utilisateur.
- Redirection vers login après succès avec message de confirmation.

---

### 5. **ProfilePage** (`hotel-ui/src/pages/ProfilePage.jsx`)
**Objectif**: Afficher et modifier le profil utilisateur.

**Fonctionnalités**:
- Récupère les données de l'utilisateur connecté via `getCurrentUser()`.
- Affichage :
  - Avatar utilisateur (image ou logo par défaut).
  - Champs : username, name, email, address, phone, mot de passe.
- **Mode édition** : permet de modifier les champs.
- **Upload d'image profil** : permet d'uploader une image via `uploadProfileImage()`.
- **Sauvegarde des modifications** : appel à `updateCurrentUser()`.
- Bouton « Déconnexion » qui supprime le token et redirige vers login.
- Gestion des erreurs avec messages détaillés.

---

### 6. **ClientsPage** (`hotel-ui/src/pages/ClientsPage.jsx`)
**Objectif**: Gestion des clients (admin seulement).

**Fonctionnalités**:
- Affiche une **table listant tous les clients**.
- Colonnes : ID, Name, Email, Phone, Address, Actions.
- **Boutons d'action** :
  - « Ajouter un client » : ouvre un dialog avec le formulaire `ClientForm`.
  - « Modifier » : edite un client existant.
  - « Supprimer » : confirme et supprime un client.
- Appels API : `getClients()`, `deleteClient()`.
- Le formulaire (ClientForm) gère la création et mise à jour.
- Actualisation de la liste après chaque action.

---

### 7. **RoomsPage** (`hotel-ui/src/pages/RoomsPage.jsx`)
**Objectif**: Gestion des chambres (admin seulement).

**Fonctionnalités**:
- Affiche une **table des chambres** avec colonnes : ID, Room Number, Type, Price, Status, Actions.
- **Badges** : indiquent le statut (Available, Occupied, Maintenance).
- **Boutons d'action** :
  - « Ajouter une chambre » : ouvre un dialog avec le formulaire `RoomForm`.
  - « Modifier » : edite une chambre existante.
  - « Supprimer » : confirme et supprime une chambre.
- Appels API : `getRooms()`, `deleteRoom()`.
- Le formulaire (RoomForm) gère la création et mise à jour des chambres.
- Actualisation après chaque action.

---

### 8. **ReservationsPage** (`hotel-ui/src/pages/ReservationsPage.jsx`)
**Objectif**: Afficher et gérer les réservations.

**Fonctionnalités**:
- Affiche une **table des réservations** avec colonnes : ID, Room, Client, Check-in, Check-out, Status, Actions.
- **Boutons d'action** :
  - « Ajouter réservation » : ouvre un dialog avec le formulaire `ReservationForm`.
  - « Annuler » : confirme et annule une réservation.
  - « Télécharger PDF » : génère un PDF de la réservation via `generateReservationPDF()`.
- Récupère les réservations, les chambres et l'utilisateur connecté.
- Affichage du nom de la chambre via une lookup des IDs.
- Gestion des erreurs et affichage de messages d'alerte.

---

### 9. **EvenementPage** (`hotel-ui/src/pages/EvenementPage.jsx`)
**Objectif**: Affichage, création et modification d'événements (admin).

**Fonctionnalités**:
- Affiche une **grille de cartes d'événements**.
- Chaque carte affiche :
  - **Image de l'événement** (si `evenement_url` existe).
  - Nom, date, durée, prix.
  - Date de création.
- **Boutons** :
  - « Réserver » (pour les utilisateurs).
  - « Modifier » et « Supprimer » (admin).
- **Dialog de création/modification** :
  - Champs : nom, date, durée, prix.
  - **Upload d'image** : permet de télécharger une image via `uploadEvenementImage()`.
  - Affichage d'un aperçu de l'image.
  - Soumission appelle `createEvenement()` ou `updateEvenement()`.
- Appels API : `getEvenements()`, `createEvenement()`, `updateEvenement()`, `deleteEvenement()`, `uploadEvenementImage()`.
- Actualisation de la liste après chaque action.

---

### 10. **RestaurantPage** (`hotel-ui/src/pages/RestaurantPage.jsx`)
**Objectif**: Affichage, création et gestion des plats (menu).

**Fonctionnalités**:
- Affiche une **grille de cartes de plats**.
- Chaque carte affiche :
  - **Image du plat** (si `plat_url` existe).
  - Nom, type, ingrédients, prix.
  - Statut de disponibilité (✓ Disponible ou ✗ Non disponible).
- **Boutons** :
  - « Commander » (ouvre un dialog de commande).
  - « Modifier » et « Supprimer » (admin).
- **Dialog de création/modification** :
  - Champs : nom, type, prix, ingrédients, disponibilité.
  - **Upload d'image** : permet de télécharger une image via `uploadPlatImage()`.
  - Affichage d'un aperçu de l'image.
  - Soumission appelle `createPlat()` ou `updatePlat()`.
- **Dialog de commande** :
  - Champs : quantité, date à manger.
  - Soumission appelle `createCommande()` et génère un PDF via `generateCommandePDF()`.
- Appels API : `getPlats()`, `createPlat()`, `updatePlat()`, `deletePlat()`, `uploadPlatImage()`, `createCommande()`.
- Actualisation après chaque action.

---

## Backend (FastAPI / Python) — Endpoints et Fonctionnalités

### Base de données
- **Modèles** : Client, Room, Reservation, Plat, Commande, Evenement, User.
- **Colonnes importantes** :
  - `Room` : id, room_number, room_type, price_per_night, status, image_url, created_at.
  - `Evenement` : id_evenement, nom_evenement, date_evenement, duree_evenement, prix_evenement, **evenement_url**, created_at.
  - `Plat` : id, nom_plat, type_plat, prix_plat, ingredient_plat, disponibilite, **plat_url**.
  - `User` : id, username, email, password_hash, role, url_image_user.

---

### Endpoints principaux

#### **Clients** (`/clients`)
- **GET /clients** : Récupère la liste de tous les clients.
- **GET /clients/{client_id}** : Récupère un client par ID.
- **POST /clients** : Crée un nouveau client.
- **PUT /clients/{client_id}** : Met à jour un client.
- **DELETE /clients/{client_id}** : Supprime un client.

#### **Rooms** (`/rooms`)
- **GET /rooms** : Récupère la liste de toutes les chambres.
- **GET /rooms/{room_id}** : Récupère une chambre par ID.
- **POST /rooms** : Crée une nouvelle chambre (admin).
- **PUT /rooms/{room_id}** : Met à jour une chambre (admin).
- **DELETE /rooms/{room_id}** : Supprime une chambre (admin).
- **POST /rooms/upload-image** : Upload une image de chambre (admin).

#### **Réservations** (`/reservations`)
- **GET /reservations** : Récupère la liste des réservations.
- **GET /reservations/{reservation_id}** : Récupère une réservation par ID.
- **POST /reservations** : Crée une nouvelle réservation.
- **PUT /reservations/{reservation_id}** : Met à jour une réservation.
- **DELETE /reservations/{reservation_id}** : Annule une réservation.

#### **Plats** (`/plats`)
- **GET /plats** : Récupère la liste de tous les plats.
- **GET /plats/{plat_id}** : Récupère un plat par ID.
- **POST /plats** : Crée un nouveau plat (admin).
- **PUT /plats/{plat_id}** : Met à jour un plat (admin).
- **DELETE /plats/{plat_id}** : Supprime un plat (admin).
- **POST /plats/upload-image** : Upload une image de plat (admin).

#### **Commandes** (`/commandes`)
- **GET /commandes** : Récupère les commandes.
- **POST /commandes** : Crée une nouvelle commande.
- **DELETE /commandes/{commande_id}** : Supprime une commande.

#### **Événements** (`/evenements`)
- **GET /evenements** : Récupère la liste des événements.
- **GET /evenements/{evenement_id}** : Récupère un événement par ID.
- **POST /evenements** : Crée un nouvel événement (admin).
- **PUT /evenements/{evenement_id}** : Met à jour un événement (admin).
- **DELETE /evenements/{evenement_id}** : Supprime un événement (admin).
- **POST /evenements/upload-image** : Upload une image d'événement (admin).

#### **Authentication** (`/auth`)
- **POST /auth/register** : Inscription d'un nouvel utilisateur.
- **POST /auth/login** : Connexion d'un utilisateur.
- **GET /auth/me** : Récupère l'utilisateur actuellement connecté (token requis).
- **PUT /auth/me** : Met à jour le profil utilisateur (token requis).
- **POST /auth/upload-profile-image** : Upload une image de profil (token requis).

---

### Utilitaires backend

#### **image_utils.py**
- `save_room_image(file)` : Sauvegarde une image dans `images/rooms/`.
- `save_event_image(file)` : Sauvegarde une image dans `images/events/`.
- `save_plat_image(file)` : Sauvegarde une image dans `images/plats/`.
- `delete_image_file(image_path)` : Supprime un fichier image.

#### **auth_controller.py**
- `login(username, password)` : Authentifie et retourne un token JWT.
- `register(username, email, password)` : Crée un nouvel utilisateur.
- `verify_token(token)` : Vérifie un token JWT.

#### **business.py** (Service métier)
Classe `Hotel` contenant la logique métier pour clients, chambres, réservations, plats, commandes et événements.

---

### Sécurité
- **Token JWT** : protège les endpoints sensibles.
- **Rôles** : "admin" et "user".
- **Endpoints admin** : vérification du rôle avant exécution.

---

## Résumé

- **Frontend** : 10 pages (accueil, exploration, connexion, inscription, profil, 3 pages de gestion admin, réservations, événements, restaurant).
- **Backend** : 6 groupes d'endpoints (clients, chambres, réservations, plats, commandes, événements, authentification).
- **Images** : upload et stockage pour chambres, événements, plats et profils utilisateurs.

---

*Fichier mis à jour : `PRESENTATION.md`*