# ✅ CHECKLIST - Vérification Complète du Projet

## 📋 Avant de Lancer

### Backend
- [ ] Python 3.8+ installé
- [ ] Virtual Environment créé et activé
- [ ] PostgreSQL installé et démarré
- [ ] `requirements.txt` installé: `pip install -r requirements.txt`
- [ ] `config.py` configuré avec les identifiants PostgreSQL
- [ ] Base de données créée: `createdb hotel_db`
- [ ] Tables créées (via `Base.metadata.create_all()`)

### Frontend
- [ ] Node.js 16+ installé
- [ ] `npm install` exécuté dans `hotel-ui/`
- [ ] Dépendances installées (vérifier node_modules/)

---

## 🚀 Démarrage

### Backend
```bash
# Terminal 1
cd /chemin/vers/Hotel
source venv/bin/activate  # ou venv\Scripts\Activate.ps1 sur Windows
python main.py
```
✅ Vérifier: `Application startup complete` sur port 9090

### Frontend
```bash
# Terminal 2
cd /chemin/vers/Hotel/hotel-ui
npm start
```
✅ Vérifier: App ouvre sur `http://localhost:3000`

---

## 🧪 Tests Fonctionnels

### 1️⃣ Navigation & Pages

#### Non-Authentifié
- [ ] Page Home charge correctement
  - [ ] Section à-propos visible
  - [ ] Section tendances visible
  - [ ] Boutons "Voir les chambres" et "Restaurant" fonctionnent
- [ ] Page Login charge
  - [ ] Formulaire visible
  - [ ] Lien vers Register fonctionne
- [ ] Page Register charge
  - [ ] Tous les champs visibles
  - [ ] Inscription crée un compte

#### Après Login (Client)
- [ ] Home accessible
- [ ] Explore (Chambres) accessible
  - [ ] Liste des chambres affichée
  - [ ] Recherche fonctionne
  - [ ] Filtrage par type fonctionne
- [ ] Restaurant accessible
  - [ ] Liste des plats affichée
  - [ ] Emojis 🍲 visibles
- [ ] Événements accessible
  - [ ] Liste des événements affichée
  - [ ] Dates et prix affichés
- [ ] Mes Réservations accessible
  - [ ] Liste des réservations affichée
  - [ ] Boutons PDF et Annuler présents
- [ ] Profil accessible
  - [ ] Données utilisateur affichées
  - [ ] Mode édition fonctionne
  - [ ] Sauvegarde fonctionne
- [ ] Header affiche les bons liens
- [ ] Déconnexion fonctionne

#### Après Login (Admin)
- [ ] Tous les liens client visibles
- [ ] Lien "Gestion Chambres" visible et accessible
- [ ] Lien "Clients" visible et accessible

---

### 2️⃣ Fonctionnalités Core

#### Réservation
- [ ] Sur page Explore, cliquer "Réserver" sur une chambre
  - [ ] Dialog s'ouvre avec détails chambre
  - [ ] Bouton "Réserver maintenant" fonctionne
  - [ ] Redirige vers page Réservations
- [ ] Sur page Réservations, créer une réservation
  - [ ] Dialog formulaire s'ouvre
  - [ ] Sélectionner chambre, dates, etc.
  - [ ] Soumettre crée la réservation
  - [ ] Réservation apparaît en liste
- [ ] Cliquer "PDF" sur une réservation
  - [ ] PDF se télécharge: `reservation_{id}.pdf`
  - [ ] PDF contient: client, chambre, dates, prix

#### Commande Restaurant
- [ ] Sur page Restaurant, cliquer "Commander" sur un plat
  - [ ] Dialog s'ouvre avec sélection quantité
  - [ ] Affichage du total (prix × quantité)
  - [ ] Sélectionner date du repas
  - [ ] Cliquer "Confirmer & Télécharger PDF"
  - [ ] PDF se télécharge: `commande_{id}.pdf`
  - [ ] PDF contient: client, plat, quantité, total, dates

#### Gestion Admin - Chambres
- [ ] Page Gestion Chambres accessible (ADMIN uniquement)
- [ ] Tableau de toutes les chambres affichée
- [ ] Bouton "Ajouter une chambre" fonctionne
  - [ ] Dialog s'ouvre
  - [ ] Remplir numéro, type, prix
  - [ ] Soumettre crée la chambre
  - [ ] Nouvelle chambre apparaît en tableau
- [ ] Cliquer "Modifier" sur une chambre
  - [ ] Dialog pré-remplie s'ouvre
  - [ ] Modifier les données
  - [ ] Soumettre met à jour
- [ ] Cliquer "Supprimer" sur une chambre
  - [ ] Confirmation demandée
  - [ ] Chambre disparaît du tableau

#### Gestion Admin - Clients
- [ ] Page Gestion Clients accessible (ADMIN uniquement)
- [ ] Tableau de tous les clients affichée
- [ ] Ajouter/Modifier/Supprimer fonctionne

#### Gestion Admin - Restaurant
- [ ] Sur page Restaurant (connecté en ADMIN)
  - [ ] Bouton "Ajouter un plat" visible
  - [ ] Cliquer ouvre dialog
  - [ ] Ajouter plat fonctionne
  - [ ] Chaque plat a boutons "Modifier" et "Supprimer"
  - [ ] Modifier/Supprimer fonctionnent

#### Gestion Admin - Événements
- [ ] Sur page Événements (connecté en ADMIN)
  - [ ] Bouton "Ajouter un événement" visible
  - [ ] Cliquer ouvre dialog
  - [ ] Ajouter événement fonctionne
  - [ ] Chaque événement a boutons "Modifier" et "Supprimer"
  - [ ] Modifier/Supprimer fonctionnent

---

### 3️⃣ Sécurité & Access Control

#### Routes Protégées
- [ ] Non-authentifié ne peut pas accéder à `/reservations`
  - [ ] Redirection vers `/login`
- [ ] Non-authentifié ne peut pas accéder à `/profile`
  - [ ] Redirection vers `/login`
- [ ] Client ne peut pas accéder à `/rooms` (admin)
  - [ ] Redirection vers `/`
- [ ] Client ne peut pas accéder à `/clients` (admin)
  - [ ] Redirection vers `/`

#### Authentification
- [ ] Login avec mauvais identifiants échoue
  - [ ] Message d'erreur affiché
- [ ] Login avec bons identifiants succède
  - [ ] Token stocké en localStorage
  - [ ] User data stocké
  - [ ] Redirection vers home ou page précédente
- [ ] Logout supprime le token
  - [ ] Redirection vers home
  - [ ] Pages protégées inaccessibles

---

### 4️⃣ Données & API

#### Affichage des Données
- [ ] Chambres: numéro, type, prix affichés correctement
- [ ] Plats: nom, type, prix, ingrédients affichés
- [ ] Événements: nom, date, durée, prix affichés
- [ ] Clients: nom, email, téléphone, adresse affichés

#### Interactions API
- [ ] Créer une réservation → API crée en BD
- [ ] Modifier une réservation → API met à jour en BD
- [ ] Supprimer une réservation → API supprime en BD
- [ ] (Même pour plats, événements, etc.)

#### Filtrage & Recherche
- [ ] Explore: Recherche chambre par numéro fonctionne
- [ ] Explore: Filtrage par type fonctionne
- [ ] Explore: Affichage des chambres disponibles correct

---

### 5️⃣ Design & UX

#### Responsive
- [ ] Page charge bien sur desktop (1200px+)
- [ ] Page charge bien sur tablet (768px)
- [ ] Page charge bien sur mobile (375px)

#### Accessibilité
- [ ] Tous les formulaires ont labels clairs
- [ ] Boutons sont visibles et cliquables
- [ ] Textes sont lisibles (couleur, taille)
- [ ] Icônes/emojis sont accompagnés de texte

#### Visuels
- [ ] Logo visible dans Header
- [ ] Couleurs MUI cohérentes
- [ ] Images chambre (SVG) affichées
- [ ] Emojis affichés correctement

---

### 6️⃣ Performance

- [ ] Page Home charge en < 2s
- [ ] Page Explore charge en < 2s
- [ ] Pas de lag lors du scroll
- [ ] Dialogs ouvrent/ferment fluidement
- [ ] PDFs se téléchargent rapidement

---

## 🔧 Si Erreurs Rencontrées

### Frontend Erreurs

#### "Cannot find module 'jspdf'"
```bash
cd hotel-ui
npm install jspdf jspdf-autotable
```

#### "Module not found: src/pages/RestaurantPage.jsx"
- Vérifier que le fichier existe: `ls src/pages/RestaurantPage.jsx`
- Vérifier l'import dans App.js est correct
- `npm start` relancer

#### Pages blanches
- Ouvrir F12 > Console
- Vérifier s'il y a des erreurs JavaScript
- Vérifier que le backend est accessible

#### PDF ne se télécharge pas
- F12 > Console > regarder les erreurs
- F12 > Network > voir les requêtes
- Vérifier que pdfGenerator.js est importé

### Backend Erreurs

#### "ModuleNotFoundError: No module named 'fastapi'"
```bash
pip install -r requirements.txt
```

#### "ConnectionRefusedError" - Postgres
- Vérifier que PostgreSQL est démarré
- Vérifier les identifiants dans config.py
- Créer la base: `createdb hotel_db`

#### "Table doesn't exist"
- Créer les tables:
```python
from config import engine, Base
Base.metadata.create_all(bind=engine)
```

#### CORS errors
- S'assurer que le backend accepte localhost:3000
- Vérifier les headers dans main.py

---

## 📊 Résumé Fonctionnalités

### Clients ✅
- [x] Voir home avec infos
- [x] Login/Register
- [x] Consulter chambres
- [x] Réserver chambre → PDF
- [x] Commander plat → PDF
- [x] Voir événements
- [x] Gérer profil
- [x] Voir mes réservations

### Admins ✅
- [x] Tout ce que les clients + :
- [x] Gérer chambres (CRUD)
- [x] Gérer clients (CRUD)
- [x] Gérer plats (CRUD)
- [x] Gérer événements (CRUD)

### Sécurité ✅
- [x] Authentification token
- [x] Role-based access
- [x] Routes protégées
- [x] Logout sécurisé

### PDF ✅
- [x] Réservations PDF
- [x] Commandes PDF

---

## 🎯 Conclusion

Quand TOUS les tests passent ✅, l'application est prête pour:
1. Tests utilisateur
2. Déploiement en production
3. Beta testing

**Bonne chance! 🚀**
