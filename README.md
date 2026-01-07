# Projet Hotel - Gestion complète avec FastAPI, PostgreSQL et React

## 📌 Description
Ce projet est une application de gestion d’hôtel moderne.  
Il permet de gérer :
- Les **clients** (ajout, modification, liste)
- Les **chambres** (ajout, suppression, disponibilité)
- Les **réservations** (création, suivi, liaison client ↔ chambre)

Technologies utilisées :
- **Backend** : FastAPI (Python)
- **Base de données** : PostgreSQL avec SQLAlchemy + Alembic
- **Frontend** : React avec Material UI et Axios

---

## 📂 Architecture du projet

hotel/
├── backend/
│   ├── main.py              # Point d'entrée FastAPI
│   ├── models.py            # Modèles SQLAlchemy (Client, Room, Reservation)
│   ├── schemas.py           # Schémas Pydantic pour validation
│   ├── controllers.py       # Endpoints API
│   ├── database.py          # Connexion PostgreSQL
│   └── migrations/          # Migrations Alembic
│
├── hotel-ui/ (Frontend React)
│   ├── public/index.html
│   ├── src/
│   │   ├── api.js           # Config Axios
│   │   ├── App.js           # App principale
│   │   ├── index.js
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   ├── Clients.js
│   │   │   ├── Rooms.js
│   │   │   └── Reservations.js
│   │   ├── layouts/DashboardLayout.js
│   │   ├── router/AppRouter.js
│   │   └── styles/theme.js
│   ├── .env                 # URLs API
│   └── package.json

---

## 🗂️ Entités principales

### Client
- id (PK)
- name
- email
- phone
- address
- created_at, updated_at

### Room
- id (PK)
- room_number
- room_type
- price_per_night
- status (available/reserved)
- created_at, updated_at

### Reservation
- id (PK)
- client_id (FK → Client)
- room_id (FK → Room)
- check_in
- check_out
- created_at, updated_at

---

## 🔗 Endpoints API

### Clients
- `GET /clients/` → liste des clients
- `POST /clients/` → créer un client
- `GET /clients/{id}` → détail d’un client
- `PUT /clients/{id}` → modifier un client
- `DELETE /clients/{id}` → supprimer un client

### Rooms
- `GET /rooms/` → liste des chambres
- `POST /rooms/` → créer une chambre
- `GET /rooms/{id}` → détail d’une chambre
- `DELETE /rooms/{id}` → supprimer une chambre

### Reservations
- `GET /reservations/` → liste des réservations
- `POST /reservations/` → créer une réservation
- `GET /reservations/{id}` → détail d’une réservation

---

## 🚀 Points forts des technologies

### PostgreSQL
- Base relationnelle robuste
- Transactions ACID
- Index et contraintes pour performance
- Relations entre tables (FK)
- Migrations avec Alembic

### FastAPI
- Framework Python rapide et moderne
- Validation automatique avec Pydantic
- Documentation Swagger auto-générée
- Support async/await
- Intégration simple avec SQLAlchemy

### React + Axios + Material UI
- Interface moderne et responsive
- Axios pour consommer les APIs
- Material UI pour design professionnel
- Routing avec React Router
- Composants réutilisables

---

## 🛠️ Roadmap

### Phase 1 : Initialisation
- Configurer FastAPI + PostgreSQL
- Créer modèles Client, Room, Reservation
- Initialiser projet React

### Phase 2 : Fonctionnalités de base
- Endpoints CRUD pour clients, rooms, reservations
- Formulaires React pour ajout et modification
- Affichage listes avec Axios

### Phase 3 : Optimisation
- Pagination et filtres
- Gestion des erreurs
- Triggers DB pour disponibilité des chambres

### Phase 4 : UX et Statistiques
- Page Home avec résumé
- Graphiques (occupations, revenus)
- Thème personnalisé

### Phase 5 : Finalisation
- Tests unitaires backend et frontend
- Documentation complète
- Déploiement

---

## ✅ Conclusion
Ce projet démontre :
- La **solidité de PostgreSQL** pour gérer les données relationnelles
- La **rapidité de FastAPI** pour exposer des APIs REST
- La **modernité de React** pour offrir une interface intuitive

Ensemble, ces technologies offrent une solution complète et scalable pour la gestion d’un hôtel.
