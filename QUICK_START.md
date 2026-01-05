# 🎯 QUICK START - 5 Minutes

## Installation Rapide

### 1. Backend
```bash
cd /chemin/vers/Hotel
# Activer venv
source venv/bin/activate
# ou sur Windows:
venv\Scripts\Activate.ps1

# Installer les packages
pip install -r requirements.txt

# Lancer
python main.py
```
✅ Vérifier: `Application startup complete` sur port 9090

### 2. Frontend
```bash
# Terminal 2
cd hotel-ui

# Installer packages (inclus jsPDF)
npm install

# Lancer
npm start
```
✅ Vérifier: App ouvre sur http://localhost:3000

---

## Test Rapide

### 1. Login
- Username: `admin`
- Password: `admin123`
- Rôle: **admin**

### 2. Test Fonctionnalités

#### Client
1. Home → Voir tendances ✅
2. Explore → Chercher chambre → Réserver ✅
3. Restaurant → Commander plat → Voir PDF ✅
4. Événements → Voir liste ✅
5. Réservations → Voir PDF ✅
6. Profil → Modifier infos ✅

#### Admin (+ client)
1. Gestion Chambres → Ajouter/modifier/supprimer ✅
2. Clients → Voir liste ✅
3. Restaurant → Boutons CRUD plat ✅
4. Événements → Boutons CRUD événement ✅

---

## 📄 Fichiers Principaux

### Nouvelles Pages (CLIENT)
- `src/pages/RestaurantPage.jsx` - 🍲 Plats + Commandes
- `src/pages/EvenementPage.jsx` - 🎉 Événements

### Pages Modifiées
- `src/App.js` - +2 routes
- `src/components/Header.jsx` - Menu réstructuré
- `src/pages/HomePage.jsx` - Section tendances
- `src/pages/ReservationsPage.jsx` - PDF support
- `package.json` - +jsPDF

### Backend Modifié
- `models.py` - Evenement.duree_evenement: String
- `controllers.py` - Simplification événement
- `dto.py` - Type duree_evenement: str

---

## 🎨 Navigation Finale

```
HEADER
├─ Logo (Home)
├─ Chambres → Explore
├─ Restaurant
├─ Événements
├─ Gestion Chambres (ADMIN)
├─ Clients (ADMIN)
├─ Mes Réservations (AUTH)
├─ Profil (AUTH)
└─ Se connecter / Déconnexion

HOME
├─ Features (4 services)
├─ Trends & Attractions (3 items)
└─ About + CTA

EXPLORE
├─ Recherche chambres
├─ Filtrage
└─ Réservation → PDF

RESTAURANT
├─ Liste plats
├─ Commande plat
└─ PDF télécharge

ÉVÉNEMENTS
├─ Liste événements
└─ Détails (date, durée, prix)

RÉSERVATIONS
├─ Mes réservations
├─ PDF télécharge
└─ Annuler réservation

PROFIL
├─ Voir infos
└─ Modifier infos

ADMIN PAGES
├─ Gestion Chambres (CRUD)
├─ Gestion Clients (liste)
├─ Plats CRUD (dans Restaurant)
└─ Événements CRUD (dans Événements)
```

---

## 🔐 Rôles

| Rôle | Accès |
|---|---|
| **Client** | Home, Explore, Restaurant, Événements, Réservations, Profil |
| **Admin** | Tout client + Gestion Chambres, Clients, CRUD Plats, CRUD Événements |
| **Non-Auth** | Home, Login, Register, Explore, Restaurant, Événements |

---

## 📊 Endpoints Clés

```
Auth:     POST /auth/login, /auth/register, GET /auth/me
Rooms:    GET/POST/PUT/DELETE /rooms
Plats:    GET/POST/PUT/DELETE /plats
Commandes: POST /commandes
Evenements: GET/POST/PUT/DELETE /evenements
Reservations: GET/POST/DELETE /reservations
```

---

## 🎁 Fichiers Documentations

| Fichier | Utilité |
|---|---|
| `LANCEMENT.md` | Instructions détaillées |
| `TESTING_CHECKLIST.md` | 70+ tests à vérifier |
| `FRONTEND_STRUCTURE.md` | Architecture complète |
| `CHANGELOG.md` | Tous les changements |
| `QUICK_START.md` | Ce fichier (5min) |

---

## ✅ Ready?

```bash
# Terminal 1: Backend
python main.py

# Terminal 2: Frontend
cd hotel-ui && npm start

# Browser
http://localhost:3000
```

**Voilà! L'app démarre en 2 terminaux** 🚀

Bon test! 🎉
