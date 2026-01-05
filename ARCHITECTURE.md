# 🏗️ ARCHITECTURE TECHNIQUE - Grand Hotel v2.0

## 📐 Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT BROWSER                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React 19.2.3 + React Router 7.11.0                 │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  Material-UI 7.3.6 (Emotion + MUI Icons)      │ │  │
│  │  │  Pages: Home, Login, Register, Explore,       │ │  │
│  │  │          Restaurant, Evenements, Reservations,│ │  │
│  │  │          Profile, RoomsAdmin, ClientsAdmin    │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  Axios Client (Centralisé)                     │ │  │
│  │  │  - Auto auth header injection (token)          │ │  │
│  │  │  - baseURL: http://127.0.0.1:9090              │ │  │
│  │  │  - API modules: auth, rooms, plats, etc.       │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  jsPDF + jsPDF-AutoTable                       │ │  │
│  │  │  - PDF Réservations                            │ │  │
│  │  │  - PDF Commandes                               │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
         │
         │ HTTP/REST (JSON)
         │ Authorization: Bearer {token}
         ↓
┌─────────────────────────────────────────────────────────────┐
│                     FASTAPI SERVER                          │
│  Port: 9090                                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Controllers (APIRouters)                            │  │
│  │  ├─ auth_controller.py → auth_router (/auth)        │  │
│  │  │   ├─ POST /register                              │  │
│  │  │   ├─ POST /login                                 │  │
│  │  │   ├─ GET /me                                     │  │
│  │  │   └─ POST /logout                                │  │
│  │  ├─ controllers.py → client_router (/clients)       │  │
│  │  │   ├─ GET / - List                                │  │
│  │  │   ├─ POST / - Create                             │  │
│  │  │   ├─ PUT /{id} - Update                          │  │
│  │  │   └─ DELETE /{id} - Delete                       │  │
│  │  ├─ controllers.py → room_router (/rooms)           │  │
│  │  │   ├─ GET / - List                                │  │
│  │  │   ├─ POST / - Create (ADMIN)                     │  │
│  │  │   ├─ PUT /{id} - Update (ADMIN)                  │  │
│  │  │   └─ DELETE /{id} - Delete (ADMIN)               │  │
│  │  ├─ controllers.py → plat_router (/plats)           │  │
│  │  │   ├─ GET / - List                                │  │
│  │  │   ├─ POST / - Create (ADMIN)                     │  │
│  │  │   ├─ PUT /{id} - Update (ADMIN)                  │  │
│  │  │   └─ DELETE /{id} - Delete (ADMIN)               │  │
│  │  ├─ controllers.py → commande_router (/commandes)   │  │
│  │  │   ├─ GET / - List                                │  │
│  │  │   ├─ POST / - Create                             │  │
│  │  │   ├─ GET /client/{id} - By client                │  │
│  │  │   └─ DELETE /{id} - Delete                       │  │
│  │  ├─ controllers.py → evenement_router (/evenements) │  │
│  │  │   ├─ GET / - List                                │  │
│  │  │   ├─ POST / - Create (ADMIN)                     │  │
│  │  │   ├─ PUT /{id} - Update (ADMIN)                  │  │
│  │  │   └─ DELETE /{id} - Delete (ADMIN)               │  │
│  │  └─ controllers.py → reservation_router             │  │
│  │      (/reservations)                                │  │
│  │      ├─ GET / - List                                │  │
│  │      ├─ POST / - Create                             │  │
│  │      ├─ GET /client/{id} - By client                │  │
│  │      └─ DELETE /{id}/client/{clientId}              │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Business Logic Layer (business.py)                 │  │
│  │  ├─ Hotel class (métier)                            │  │
│  │  ├─ create_room, update_room, delete_room           │  │
│  │  ├─ create_client, update_client, delete_client     │  │
│  │  ├─ create_reservation, cancel_reservation          │  │
│  │  ├─ create_plat, update_plat, delete_plat           │  │
│  │  ├─ create_commande_plat, delete_commande_plat      │  │
│  │  ├─ create_evenement, update_evenement              │  │
│  │  └─ check_room_availability                         │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Data Access Layer (dal.py)                         │  │
│  │  ├─ ClientDao                                       │  │
│  │  ├─ RoomDao                                         │  │
│  │  ├─ ReservationDao                                  │  │
│  │  ├─ PlatDao                                         │  │
│  │  ├─ CommandePlatDao                                 │  │
│  │  └─ EvenementDao                                    │  │
│  │                                                      │  │
│  │  Auth Layer (auth_dal.py)                           │  │
│  │  ├─ UserDao                                         │  │
│  │  ├─ hash_password                                   │  │
│  │  └─ verify_password                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Validation Layer (dto.py)                          │  │
│  │  ├─ UserRegisterRequest/Response                    │  │
│  │  ├─ UserLoginRequest                                │  │
│  │  ├─ ClientRequest/Response                          │  │
│  │  ├─ RoomRequest/Response                            │  │
│  │  ├─ ReservationRequest/Response                     │  │
│  │  ├─ PlatRequest/Response                            │  │
│  │  ├─ CommandePlatRequest/Response                    │  │
│  │  └─ EvenementRequest/Response                       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
         │
         │ SQLAlchemy ORM
         │
         ↓
┌─────────────────────────────────────────────────────────────┐
│                  POSTGRESQL DATABASE                         │
│                                                               │
│  Tables:                                                     │
│  ├─ user (id, username, email, password_hash, role, ...)  │
│  ├─ client (id, name, email, phone, address, ...)         │
│  ├─ room (id, number, type, price, status, ...)           │
│  ├─ reservation (id, client_id→, room_id→, check_in, ...)│
│  ├─ plat (id, nom_plat, type_plat, prix_plat, ...)       │
│  ├─ commande_plat (id_commande, id_client→, id_plat→, ...) │
│  └─ evenement (id_evenement, nom_evenement, date, prix,..) │
│                                                               │
│  Relationships:                                              │
│  ├─ client ←→ reservation (1:N)                            │
│  ├─ room ←→ reservation (1:N)                              │
│  ├─ plat ←→ commande_plat (1:N)                            │
│  └─ client ←→ commande_plat (1:N)                          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentification & Sécurité

### Flow Auth
```
1. Utilisateur Register
   ├─ POST /auth/register {username, email, password, ...}
   ├─ Backend: hash password (bcrypt)
   ├─ Backend: create User(role="client")
   ├─ Response: UserResponse {id, username, email, role, ...}
   └─ Frontend: localStorage.setItem("user", {...})

2. Utilisateur Login
   ├─ POST /auth/login {username, password}
   ├─ Backend: verify password
   ├─ Backend: generate token (secrets.token_urlsafe)
   ├─ Backend: store token → user_tokens[token] = user.id
   ├─ Response: TokenResponse {access_token, token_type, user}
   └─ Frontend: 
      ├─ localStorage.setItem("token", access_token)
      ├─ localStorage.setItem("user", {...})
      └─ Redirect to home

3. API Requests (Protected)
   ├─ Frontend: Every request
   │  ├─ Get token from localStorage
   │  ├─ Add header: Authorization: Bearer {token}
   │  └─ Send request
   ├─ Backend: Middleware
   │  ├─ Extract token from header
   │  ├─ Check if token in user_tokens
   │  ├─ Get user_id from token
   │  ├─ Fetch User from DB
   │  └─ Pass to handler
   └─ Response: Resource or 401

4. Logout
   ├─ POST /auth/logout
   ├─ Backend: del user_tokens[token]
   ├─ Frontend: 
   │  ├─ localStorage.removeItem("token")
   │  ├─ localStorage.removeItem("user")
   │  └─ Redirect to login
```

### Role-Based Access Control
```
Frontend:
├─ isAuthenticated() = !!localStorage.getItem("token")
├─ getUser() = JSON.parse(localStorage.getItem("user"))
├─ isAdmin() = getUser()?.role === "admin"
├─ PrivateRoute: Require isAuthenticated()
└─ AdminRoute: Require isAuthenticated() && isAdmin()

Backend (Optional):
├─ get_current_user(token) = user from user_tokens
└─ Check user.role in handlers for ADMIN operations
```

---

## 📦 Architecture Composants Frontend

### Structure Hiérarchique
```
App.js (Router + Routes)
├─ Header (Navigation, Auth)
├─ main (Container)
│  └─ Routes
│     ├─ HomePage
│     ├─ LoginPage
│     ├─ RegisterPage
│     ├─ ExplorePage (chambres client)
│     ├─ RestaurantPage (NEW)
│     ├─ EvenementPage (NEW)
│     ├─ ReservationsPage
│     ├─ RoomsPage (admin)
│     ├─ ClientsPage (admin)
│     └─ ProfilePage
└─ Footer
```

### Composants Réutilisables
```
components/
├─ Header.jsx (Logo + Nav + Auth buttons)
├─ Footer.jsx (Copyright)
├─ FormInput.jsx (Input field reusable)
├─ PrimaryButton.jsx (Button styled)
├─ RoomCard.jsx (Room display card)
├─ ReservationForm.jsx (Reservation form)
├─ PlatForm.jsx (NEW - Plat form)
└─ EvenementForm.jsx (NEW - Event form)
```

### API Clients
```
api/
├─ client.js (Axios instance centralisé + interceptors)
├─ auth.js (register, login, logout, getCurrentUser)
├─ rooms.js (getRooms, createRoom, updateRoom, deleteRoom)
├─ clients.js (getClients, updateClient, deleteClient)
├─ reservations.js (getReservations, createReservation, cancelReservation)
├─ plats.js (getPlats, createPlat, updatePlat, deletePlat)
├─ commandes.js (getCommandes, createCommande, deleteCommande)
├─ evenements.js (getEvenements, createEvenement, updateEvenement, deleteEvenement)
└─ pdfGenerator.js (generateReservationPDF, generateCommandePDF)
```

---

## 📊 Data Models

### User
```
{
  id: int (PK),
  username: str (unique),
  email: str (unique),
  password_hash: str,
  role: str ("client" | "admin"),
  name: str,
  phone: str,
  address: str,
  created_at: datetime,
  updated_at: datetime
}
```

### Client
```
{
  id: int (PK),
  name: str,
  email: str (unique),
  phone: str,
  address: str,
  created_at: datetime,
  updated_at: datetime
}
```

### Room
```
{
  id: int (PK),
  number: str,
  type: str ("single" | "double" | "suite"),
  price: float,
  status: str ("available" | "occupied"),
  created_at: datetime,
  updated_at: datetime
}
```

### Reservation
```
{
  id: int (PK),
  client_id: int (FK→Client),
  room_id: int (FK→Room),
  check_in: date,
  check_out: date,
  created_at: datetime,
  updated_at: datetime
}
```

### Plat
```
{
  id: int (PK),
  nom_plat: str,
  type_plat: str,
  prix_plat: float,
  ingredient_plat: str,
  disponibilite: bool,
  created_at: datetime,
  updated_at: datetime
}
```

### CommandePlat
```
{
  id_commande: int (PK),
  id_client: int (FK→Client),
  id_plat: int (FK→Plat),
  nom_plat: str,
  nb_deplat: int,
  date_commande: date,
  date_a_manger: date
}
```

### Evenement
```
{
  id_evenement: int (PK),
  nom_evenement: str,
  date_evenement: date,
  duree_evenement: str ("HH:MM:SS"),
  prix_evenement: float,
  created_at: datetime,
  updated_at: datetime
}
```

---

## 🌐 API Contract

### Request/Response Pattern
```
Request:
{
  "method": "POST" | "GET" | "PUT" | "DELETE",
  "path": "/endpoint",
  "headers": {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json"
  },
  "body": {...}
}

Response Success (200-299):
{
  "id": ...,
  "field1": ...,
  "field2": ...,
  "created_at": ...,
  "updated_at": ...
}

Response Error (4xx-5xx):
{
  "detail": "Error message"
}
```

---

## 🎨 Styling Architecture

### Material-UI System
```
theme:
├─ palette:
│  ├─ primary: blue
│  ├─ secondary: ?
│  └─ background: white
├─ typography:
│  ├─ h1-h6: Heading styles
│  ├─ body1-body2: Text styles
│  └─ button: Button text
└─ spacing: 8px unit

MUI Components:
├─ Container (max-width: 1200px)
├─ Grid (12-column responsive)
├─ Card (elevation + shadow)
├─ TextField (input + validation)
├─ Button (variant: contained | outlined)
├─ Dialog (modal + form)
├─ Table (rows + columns)
├─ Chip (badge + status)
├─ AppBar (header navigation)
└─ Toolbar (header content)

Breakpoints:
├─ xs: 0px (mobile)
├─ sm: 600px (tablet)
├─ md: 960px (small desktop)
├─ lg: 1280px (desktop)
└─ xl: 1920px (large desktop)
```

---

## 🚀 Deployment Checklist

- [ ] Environment variables setup
- [ ] Database migrations
- [ ] Build frontend: `npm run build`
- [ ] Serve static files from backend
- [ ] Setup CORS for production domain
- [ ] HTTPS certificates
- [ ] Database backups
- [ ] Error logging (Sentry, LogRocket)
- [ ] Performance monitoring
- [ ] Security headers (HSTS, CSP, etc.)
- [ ] Rate limiting
- [ ] Load testing

---

## 🔬 Testing Strategy

### Unit Tests
- Auth functions (login, register, hash)
- DAO methods (CRUD operations)
- Business logic (availability check, etc.)

### Integration Tests
- API endpoints (request → response)
- Database operations
- Auth flow (register → login → request → logout)

### E2E Tests
- User journey (home → search → book → pdf)
- Admin workflow (add → modify → delete)
- Edge cases (invalid input, duplicate, etc.)

---

## 📈 Performance Optimization

### Frontend
- Code splitting with React.lazy
- Memoization (useMemo, useCallback)
- Virtual scrolling for large lists
- Image optimization (WebP, lazy load)

### Backend
- Database indexing on FK + commonly queried fields
- Query optimization (select specific columns)
- Caching layer (Redis optional)
- Request pagination for large datasets

### Network
- Gzip compression
- CDN for static assets
- HTTP/2 push
- Service workers for offline support

---

**Version**: 2.0
**Updated**: January 5, 2026
**Status**: Complete & Documented
