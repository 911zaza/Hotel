# 🎯 Instructions de Lancement - Grand Hotel Application

## 📋 Prérequis

- Node.js 16+ avec npm
- Python 3.8+ avec FastAPI
- PostgreSQL pour la base de données
- Virtual Environment Python activé

---

## 🚀 Démarrage Rapide

### 1️⃣ Installer les dépendances Frontend

```bash
cd hotel-ui
npm install
```

Cela installera automatiquement:
- Material-UI (MUI) pour le design
- Axios pour les appels API
- React Router pour la navigation
- **jsPDF + jsPDF-AutoTable** pour la génération de PDF ✨

### 2️⃣ Installer les dépendances Backend

```bash
# Assurez-vous que le venv est activé
pip install -r requirements.txt
```

### 3️⃣ Configurer la Base de Données

```bash
# Créer la base de données PostgreSQL
createdb hotel_db

# Ou utiliser PgAdmin pour créer manuellement
```

Mettez à jour `config.py` avec vos identifiants:
```python
DATABASE_URL = "postgresql://user:password@localhost/hotel_db"
```

### 4️⃣ Lancer le Backend

```bash
# Du répertoire racine (hotel/)
python main.py
```

Le serveur démarrera sur: **http://127.0.0.1:9090**

✅ Vous verrez: `INFO:     Application startup complete`

### 5️⃣ Lancer le Frontend

```bash
# Dans un autre terminal, du répertoire hotel-ui/
npm start
```

L'app ouvrira automatiquement sur: **http://localhost:3000**

---

## 🧪 Tester l'Application

### Compte Admin (par défaut)
- **Username**: `admin`
- **Password**: `admin123`
- **Role**: admin

### Compte Client (créer via Register)
1. Cliquez sur "Se connecter"
2. Cliquez sur "Pas encore inscrit? Créer un compte"
3. Remplissez le formulaire et cliquez "S'inscrire"
4. Vous serez automatiquement connecté

### Tests Recommandés

#### ✅ Pour Clients
1. **Home** - Vérifier le contenu de présentation
2. **Explore (Chambres)** - Chercher et filtrer les chambres
3. **Restaurant** - Commander un plat et télécharger le PDF
4. **Événements** - Voir la liste des événements
5. **Mes Réservations** - Créer une réservation et générer le PDF
6. **Profil** - Mettre à jour vos informations

#### ✅ Pour Admins
1. **Gestion Chambres** - Ajouter/modifier/supprimer une chambre
2. **Gestion Clients** - Voir la liste et gérer les clients
3. **Restaurant** - Voir les boutons admin, ajouter un plat
4. **Événements** - Voir les boutons admin, ajouter un événement
5. **+ Toutes les actions client**

---

## 📊 Structure du Projet

```
Hotel/
├── backend/
│   ├── models.py              # Modèles SQLAlchemy
│   ├── dto.py                 # Validation Pydantic
│   ├── controllers.py         # Routes et endpoints
│   ├── auth_controller.py     # Auth endpoints
│   ├── business.py            # Logique métier
│   ├── dal.py                 # Data Access Layer
│   ├── auth_dal.py            # Auth DAL
│   ├── config.py              # Configuration
│   ├── main.py                # Point d'entrée
│   └── requirements.txt        # Dépendances Python
│
└── hotel-ui/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── pages/
    │   │   ├── HomePage.jsx           ✨ À-propos + tendances
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── ExplorePage.jsx        ✨ Chambres pour clients
    │   │   ├── ReservationsPage.jsx   ✨ Avec PDF
    │   │   ├── RestaurantPage.jsx     ✨ NOUVEAU: Plats + commandes
    │   │   ├── EvenementPage.jsx      ✨ NOUVEAU: Événements
    │   │   ├── RoomsPage.jsx          🔐 Admin: gestion chambres
    │   │   ├── ClientsPage.jsx        🔐 Admin: gestion clients
    │   │   └── ProfilePage.jsx
    │   ├── components/
    │   │   ├── Header.jsx             ✨ Mise à jour: nouveaux liens
    │   │   ├── Footer.jsx
    │   │   ├── PlatForm.jsx           ✨ NOUVEAU: Formulaire plat
    │   │   ├── EvenementForm.jsx      ✨ NOUVEAU: Formulaire événement
    │   │   └── ReservationForm.jsx
    │   ├── api/
    │   │   ├── client.js              ✅ Client axios centralisé
    │   │   ├── auth.js
    │   │   ├── rooms.js
    │   │   ├── clients.js
    │   │   ├── reservations.js
    │   │   ├── plats.js
    │   │   ├── commandes.js
    │   │   ├── evenements.js
    │   │   └── pdfGenerator.js        ✅ PDF: réservations + commandes
    │   ├── utils/
    │   │   └── auth.js
    │   ├── assets/
    │   │   ├── logo.svg
    │   │   └── room-*.svg
    │   ├── App.js                     ✨ Mise à jour: nouvelles routes
    │   └── index.js
    ├── package.json                   ✨ Mise à jour: jsPDF
    └── README.md
```

---

## 🔐 Points d'Accès Sécurisés

### Routes Authentifiées (Clients)
- `/reservations` - Voir mes réservations
- `/profile` - Mon profil

### Routes Admin-Only
- `/rooms` - Gestion complète des chambres
- `/clients` - Gestion complète des clients

Tentative d'accès sans droits = redirection vers Home (`/`)

---

## 🐛 Dépannage

### ❌ Erreur: "Cannot find module 'jspdf'"
```bash
# Solution:
cd hotel-ui
npm install jspdf jspdf-autotable
```

### ❌ Backend ne répond pas
- Vérifiez que le serveur est sur `http://127.0.0.1:9090`
- Vérifiez le fichier `.env` ou `REACT_APP_API_BASE`
- Check `main.py` démarrage: `python main.py`

### ❌ Base de données non trouvée
```python
# Créer et initialiser:
# Dans PostgreSQL ou PgAdmin:
CREATE DATABASE hotel_db;

# Puis dans Python:
from config import engine, Base
Base.metadata.create_all(bind=engine)
```

### ❌ Les PDF ne se téléchargent pas
- Assurez-vous jsPDF est installé: `npm list jspdf`
- Vérifiez la console du navigateur (F12 > Console)

---

## 📝 Endpoints Disponibles

### Authentication
```
POST   /auth/register          - Créer un compte
POST   /auth/login             - Se connecter
GET    /auth/me                - Utilisateur actuel (header: Authorization)
POST   /auth/logout            - Se déconnecter
```

### Rooms (Chambres)
```
GET    /rooms                  - Lister toutes les chambres
POST   /rooms                  - Créer (ADMIN)
PUT    /rooms/{id}             - Modifier (ADMIN)
DELETE /rooms/{id}             - Supprimer (ADMIN)
```

### Reservations
```
GET    /reservations           - Lister toutes
POST   /reservations           - Créer
GET    /reservations/client/{id} - Par client
DELETE /reservations/{id}/client/{clientId} - Annuler
```

### Restaurant (Plats)
```
GET    /plats                  - Lister
POST   /plats                  - Créer (ADMIN)
PUT    /plats/{id}             - Modifier (ADMIN)
DELETE /plats/{id}             - Supprimer (ADMIN)
```

### Commandes
```
GET    /commandes              - Lister
POST   /commandes              - Créer
GET    /commandes/client/{id}  - Par client
DELETE /commandes/{id}         - Supprimer
```

### Events (Événements)
```
GET    /evenements             - Lister
POST   /evenements             - Créer (ADMIN)
PUT    /evenements/{id}        - Modifier (ADMIN)
DELETE /evenements/{id}        - Supprimer (ADMIN)
```

### Clients
```
GET    /clients                - Lister tous
POST   /clients                - Créer
PUT    /clients/{id}           - Modifier
DELETE /clients/{id}           - Supprimer (ADMIN)
```

---

## 🎯 Fonctionnalités Clés

### ✨ Pages Cliente
- ✅ Home avec à-propos et tendances
- ✅ Explore: Recherche et filtrage de chambres
- ✅ Restaurant: Catalogue avec commande et PDF
- ✅ Événements: Affichage et détails
- ✅ Réservations: Gestion et PDF
- ✅ Profil: Modification des données

### ✨ Pages Admin
- ✅ Gestion Chambres: CRUD complet
- ✅ Gestion Clients: CRUD complet
- ✅ Gestion Plats: CRUD (dans Restaurant)
- ✅ Gestion Événements: CRUD (dans Événements)

### ✨ PDF
- ✅ Réservations: Détails client + chambre
- ✅ Commandes: Détails client + plat + quantité

### ✨ Sécurité
- ✅ Authentification token
- ✅ Rôles (client/admin)
- ✅ Routes protégées
- ✅ Access control par API

---

## 📞 Support

Pour toute question ou problème:
1. Vérifiez les logs du terminal (backend et frontend)
2. Ouvrez la console du navigateur (F12)
3. Vérifiez les erreurs réseau dans Network tab
4. Assurez-vous que tous les services sont démarrés

---

**Version**: 2.0 - Complete Hotel Management System
**Created**: January 2026
**Status**: Ready for Testing ✅
