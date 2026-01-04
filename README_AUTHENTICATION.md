# Guide d'Authentification - Système Hôtel

## Fichiers créés/modifiés

### Backend Python

1. **models.py** - Ajout de la classe `User` avec :
   - username (unique)
   - email (unique)
   - password_hash
   - role (admin/client)
   - name, phone, address (optionnels)

2. **auth_dal.py** - Nouveau fichier avec :
   - `UserDao` : Gestion CRUD des utilisateurs
   - `hash_password()` : Hashage SHA256 (simple)
   - `verify_password()` : Vérification du mot de passe

3. **auth_controller.py** - Nouveau fichier avec endpoints :
   - `POST /auth/register` : Inscription
   - `POST /auth/login` : Connexion
   - `GET /auth/me` : Info utilisateur connecté
   - `POST /auth/logout` : Déconnexion

4. **dto.py** - Ajout des DTOs :
   - `UserRegisterRequest`
   - `UserLoginRequest`
   - `UserResponse`
   - `TokenResponse`

5. **main.py** - Ajout du router auth

### Frontend React

1. **hotel-ui/src/api/auth.js** - API calls pour auth
2. **hotel-ui/src/pages/RegisterPage.jsx** - Page d'inscription
3. **hotel-ui/src/pages/LoginPage.jsx** - Modifiée pour utiliser l'API
4. **hotel-ui/src/utils/auth.js** - Utilitaires auth
5. **hotel-ui/src/App.js** - Navigation selon rôle
6. **hotel-ui/src/pages/ProfilePage.jsx** - À modifier pour afficher vraies infos

### SQL Script

**create_user_table.sql** - Script SQL pour créer la table user (optionnel si vous utilisez SQLAlchemy auto-create)

## Étapes d'installation

### 1. Créer la table dans la base de données

**Option A : Utiliser SQLAlchemy (recommandé)**
- Redémarrer le serveur Python, SQLAlchemy créera automatiquement la table

**Option B : Créer manuellement**
```bash
psql -U postgres -d db_hotel -f create_user_table.sql
```

### 2. Redémarrer le backend

```bash
uvicorn main:app --reload --port 9090
```

### 3. Tester l'API

```bash
# Inscription
curl -X POST http://127.0.0.1:9090/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Connexion
curl -X POST http://127.0.0.1:9090/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

## Fonctionnalités

### Pour les Clients
- Inscription/Connexion
- Page Explore pour voir les chambres
- Page Réservations (simple) pour faire une réservation
- Profil avec leurs informations

### Pour les Admins
- Accès à toutes les pages (Clients, Chambres, Réservations)
- Gestion complète du système

## Notes importantes

1. **Hashage des mots de passe** : J'ai utilisé SHA256 pour simplifier. En production, utilisez bcrypt avec `passlib[bcrypt]`.

2. **Tokens** : J'ai utilisé un système de tokens simples stockés en mémoire. En production, utilisez JWT avec `python-jose`.

3. **Pour créer un admin** : Modifiez directement dans la base de données :
```sql
UPDATE "user" SET role = 'admin' WHERE username = 'votre_username';
```

4. **CORS** : Déjà configuré dans main.py

## Prochaines étapes

1. ✅ Table User créée
2. ✅ Endpoints auth créés
3. ✅ Page inscription créée
4. ✅ Page connexion modifiée
5. ⏳ ProfilePage à modifier pour afficher vraies infos
6. ⏳ Page réservations client (simple)

