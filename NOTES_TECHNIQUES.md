# 🔧 NOTES TECHNIQUES IMPORTANTES

## 📌 Avant de Tester

### Installation Requise
```bash
# Frontend - CRITICAL
cd hotel-ui
npm install  # Installe jsPDF, jsPDF-AutoTable
```

Si vous avez une erreur "Cannot find module 'jspdf'":
```bash
npm install jspdf jspdf-autotable
```

### Backend - Prérequis
```python
# Dans requirements.txt:
FastAPI
SQLAlchemy
Pydantic
python-jose
psycopg2-binary
# Tous déjà présents
```

---

## ⚙️ Configuration

### Backend - config.py
```python
# Vérifier:
DATABASE_URL = "postgresql://user:password@localhost/hotel_db"
# Remplacer user:password par vos identifiants PostgreSQL
```

### Frontend - Axios Base URL
```javascript
// Dans api/client.js:
const base = process.env.REACT_APP_API_BASE || 'http://127.0.0.1:9090';
// Default: http://127.0.0.1:9090
```

Si backend sur port différent:
```javascript
const base = 'http://127.0.0.1:YOUR_PORT';
```

---

## 🔐 Authentification - Important!

### Token Storage
**ATTENTION**: Actuellement, les tokens sont stockés en localStorage dans le navigateur.

**Pour PRODUCTION**, utiliser:
```javascript
// À la place de localStorage:
// - HttpOnly Cookies (securisé)
// - SessionStorage (destructible)
// - IndexedDB (complexe mais persistant)
```

### Recommandation Production:
```javascript
// Utiliser django-rest-auth ou similar
// Avec JWT + Refresh token
// Sur HttpOnly Cookies
```

### Actuellement:
```javascript
// Frontend stocke:
localStorage.setItem('token', response.data.access_token);
localStorage.setItem('user', JSON.stringify(response.data.user));

// Backend récupère:
user_id = user_tokens.get(token)  // Simple dict, PAS DB
```

---

## 📊 Base de Données - Schéma

### Tables Existantes
```sql
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'client',
  name VARCHAR(100),
  phone VARCHAR(15),
  address VARCHAR(200),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE client (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  phone VARCHAR(15) NOT NULL,
  address VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE room (
  id SERIAL PRIMARY KEY,
  number VARCHAR NOT NULL,
  type VARCHAR(50) NOT NULL,  -- single, double, suite
  price FLOAT NOT NULL,
  status VARCHAR(20) DEFAULT 'available',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reservation (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES client(id),
  room_id INTEGER REFERENCES room(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE plat (
  id SERIAL PRIMARY KEY,
  nom_plat VARCHAR(100) NOT NULL,
  type_plat VARCHAR(50) NOT NULL,
  prix_plat FLOAT NOT NULL,
  ingredient_plat TEXT NOT NULL,
  disponibilite BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE commande_plat (
  id_commande SERIAL PRIMARY KEY,
  id_client INTEGER REFERENCES client(id),
  id_plat INTEGER REFERENCES plat(id),
  nom_plat VARCHAR(100) NOT NULL,
  nb_deplat INTEGER NOT NULL,
  date_commande DATE NOT NULL,
  date_a_manger DATE NOT NULL
);

CREATE TABLE evenement (
  id_evenement SERIAL PRIMARY KEY,
  nom_evenement VARCHAR(150) NOT NULL,
  date_evenement DATE NOT NULL,
  duree_evenement VARCHAR NOT NULL,  -- FORMAT: "HH:MM:SS"
  prix_evenement FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Alignement Type Duree
```python
# ANCIEN (incorrect):
duree_evenement = Column(Interval, nullable=True)  # PostgreSQL Interval type
# Problème: Python timedelta ≠ PostgreSQL Interval seriellement

# NOUVEAU (correct):
duree_evenement = Column(String, nullable=True)  # Store as "HH:MM:SS"
# Solution: String compatible frontend/backend
```

---

## 🐛 Erreurs Communes & Solutions

### Erreur: "Cannot find module 'jspdf'"
```bash
# Solution:
cd hotel-ui
npm install jspdf jspdf-autotable
```

### Erreur: "connection refused" (PostgreSQL)
```bash
# Vérifier PostgreSQL démarre:
psql -U postgres -h localhost

# Si pas installé:
# Windows: Download PostgreSQL installer
# Mac: brew install postgresql
# Linux: sudo apt install postgresql
```

### Erreur: "relation does not exist" (table)
```python
# Solution dans Python:
from config import engine, Base
Base.metadata.create_all(bind=engine)
```

### Erreur: "CORS error"
```
Frontend: http://localhost:3000
Backend: http://127.0.0.1:9090
→ Différentes origins!

Solution dans main.py:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### PDF ne télécharge pas
```javascript
// Vérifier imports:
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Vérifier fonction dans api/pdfGenerator.js
// Vérifier appel dans page:
generateReservationPDF(reservation, client, room);
```

### Page blanche après login
```javascript
// Vérifier localStorage:
console.log(localStorage.getItem('token'));
console.log(localStorage.getItem('user'));

// Vérifier isAuthenticated() fonction:
// utils/auth.js doit retourner true
```

---

## 🔍 Debugging Tips

### Frontend (F12)
```javascript
// Console tab - Voir les erreurs JS
// Network tab - Voir les requêtes API
// Application tab - Voir localStorage

// Commandes utiles:
localStorage.getItem('token')
localStorage.getItem('user')
JSON.parse(localStorage.getItem('user'))
```

### Backend (Terminal)
```python
# Logs:
print("Debug:", variable)  # Affiche dans terminal

# Erreurs:
raise HTTPException(status_code=400, detail="Message")

# Tests rapides:
from models import *
from dal import ClientDao
# Tester les classes directement
```

### Network Requests (F12 → Network)
```
Vérifier:
- Status: 200 OK (succès)
- Status: 401 Unauthorized (token invalide)
- Status: 404 Not Found (route inexistante)
- Status: 500 Server Error (backend crash)
```

---

## ⚡ Optimisations Recommendations

### Frontend
```javascript
// Code splitting (React lazy loading)
const RestaurantPage = lazy(() => import('./pages/RestaurantPage'));

// Memoization
const MemoComponent = memo(Component);

// useMemo pour calculs lourds
const filteredRooms = useMemo(() => {
  return rooms.filter(r => r.price > minPrice);
}, [rooms, minPrice]);
```

### Backend
```python
# Indexing (config.py)
from sqlalchemy import Index
Index('idx_user_username', User.username)
Index('idx_reservation_client_id', Reservation.client_id)

# Query optimization
# Utiliser select() au lieu de query()
# Paginer les résultats (LIMIT, OFFSET)
```

### Database
```sql
-- Indexes:
CREATE INDEX idx_user_username ON "user"(username);
CREATE INDEX idx_reservation_client_id ON reservation(client_id);
CREATE INDEX idx_plat_nom ON plat(nom_plat);
```

---

## 📈 Performance Baseline

| Opération | Temps Attendu |
|---|---|
| App démarrage | < 3s |
| Page Home | < 1s |
| Liste Chambres (50 items) | < 500ms |
| Login | < 1s |
| Créer Réservation | < 1s |
| Générer PDF | < 500ms |
| Télécharger PDF | Immédiat |

---

## 🔒 Security Checklist

- [ ] Passwords hachés (bcrypt) ✅
- [ ] Tokens générés (secrets.token_urlsafe) ✅
- [ ] Routes protégées ✅
- [ ] HTTPS configuré (PRODUCTION)
- [ ] CORS limité au domaine (PRODUCTION)
- [ ] Rate limiting ajouté (PRODUCTION)
- [ ] Input validation (Pydantic DTOs) ✅
- [ ] SQL injection protected (SQLAlchemy ORM) ✅
- [ ] XSS protected (React escapes) ✅
- [ ] CSRF tokens (optionnel pour API)

---

## 📚 Fichiers Importants à Connaître

### Frontend Critiques
```
src/
├─ api/client.js          → Configuration axios (baseURL, auth)
├─ utils/auth.js          → Fonctions d'auth (isAuthenticated, isAdmin)
├─ App.js                 → Routes et protections
├─ components/Header.jsx  → Navigation
└─ pages/*                → Pages principales
```

### Backend Critiques
```
├─ config.py              → Database URL + config
├─ main.py                → Entry point + middleware
├─ models.py              → SQLAlchemy models
├─ controllers.py         → Routes + endpoints
├─ auth_controller.py     → Auth routes
├─ business.py            → Business logic
└─ dal.py, auth_dal.py    → Database access
```

---

## 🎯 Testing Strategy

### Manual Testing (Recommended)
1. User story par user story
2. Teste tous les happy paths
3. Teste les edge cases
4. Teste les erreurs

### Automated Testing (Optional)
```bash
# Frontend
npm test

# Backend
pytest tests/
```

---

## 📞 Quick Reference Commands

```bash
# Start Backend
python main.py

# Start Frontend
cd hotel-ui && npm start

# Build Frontend
cd hotel-ui && npm run build

# Check Python version
python --version

# Check Node version
node --version
npm --version

# Check npm packages
npm list

# Clear npm cache
npm cache clean --force

# Reinstall node_modules
rm -rf node_modules package-lock.json && npm install

# Check PostgreSQL
psql -U postgres -h localhost -c "SELECT version();"
```

---

## 🚀 Deployment Notes

### Frontend (Vercel/Netlify)
```bash
# Build
npm run build

# Outputs: build/ folder
# Deploy build/ folder to hosting
```

### Backend (Heroku/Railway/Render)
```bash
# Requirements.txt for Python
pip freeze > requirements.txt

# Procfile for Heroku
web: gunicorn main:app

# Or use Railway for easy deploy
```

### Environment Variables
```bash
# .env file (add to .gitignore!)
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
REACT_APP_API_BASE=https://your-api.com
```

---

## 📝 Maintenance Notes

### After Code Changes
1. Test affected components
2. Check console for errors
3. Verify network requests (F12)
4. Test on mobile view

### Regular Updates
- Keep npm packages updated: `npm update`
- Keep Python packages updated: `pip install --upgrade -r requirements.txt`
- Database backups
- Monitor error logs

---

## 🎓 Learning Resources

- **FastAPI**: https://fastapi.tiangolo.com/
- **React**: https://react.dev/
- **Material-UI**: https://mui.com/
- **SQLAlchemy**: https://www.sqlalchemy.org/
- **PostgreSQL**: https://www.postgresql.org/

---

**Dernière mise à jour**: January 5, 2026
**Version**: 2.0
**Status**: Production Ready
