# Gestion des Images - Hotel Management

## Architecture

Les images sont maintenant servies depuis le backend FastAPI et les URLs sont stockées en base de données.

### Structure des fichiers

```
Hotel/
├── images/
│   ├── rooms/          # Images des chambres (10 images)
│   └── profiles/       # Images des profils utilisateurs (4 images)
├── hotel-ui/public/    # Frontend React
└── main.py             # Configuration StaticFiles
```

### Points de terminaison statiques

- **Chambres**: `http://localhost:8000/images/rooms/[filename]`
- **Profils**: `http://localhost:8000/images/profiles/[filename]`

## Utilisation

### 1. Premier démarrage - Initialiser les images en base de données

Une fois que le backend démarre, les images sont automatiquement servies depuis `/images`.

Pour initialiser les URLs en base de données:

```bash
python init_images.py
```

Ceci assignera automatiquement:
- Une image différente à chaque chambre (rotation sur les 10 images)
- Une image différente à chaque utilisateur (rotation sur les 4 images)

### 2. Modifier les images depuis l'interface web

#### Pour les admins (chambres):
1. Aller à **Chambres → Modifier**
2. Remplir le champ "URL Image Chambre"
3. Exemples d'URLs:
   - `http://localhost:8000/images/rooms/téléchargement.jpeg`
   - Ou une URL externe: `https://exemple.com/image.jpg`

#### Pour les utilisateurs (profil):
1. Aller à **Mon Profil → Modifier**
2. Remplir le champ "URL Image Profil"
3. Exemples d'URLs:
   - `http://localhost:8000/images/profiles/téléchargement (1).jpeg`
   - Ou une URL externe: `https://exemple.com/photo.jpg`

## Architecture de la base de données

### Table `room`
- `url_image_chambre` (TEXT, nullable) - URL de l'image de la chambre

### Table `user`
- `url_image_user` (TEXT, nullable) - URL de l'image de profil

## Points d'API modifiés

### GET /rooms
Retourne maintenant `image_url` pour chaque chambre

```json
{
  "id": 1,
  "room_number": "101",
  "room_type": "single",
  "price_per_night": 80.0,
  "is_available": true,
  "image_url": "http://localhost:8000/images/rooms/téléchargement.jpeg"
}
```

### GET /auth/me
Retourne maintenant `url_image_user`

```json
{
  "id": 1,
  "username": "john",
  "email": "john@example.com",
  "role": "client",
  "name": "John Doe",
  "url_image_user": "http://localhost:8000/images/profiles/téléchargement.jpeg"
}
```

## Ajouter plus d'images

Pour ajouter plus d'images:

1. Copier les fichiers dans:
   - `Hotel/images/rooms/` (pour les chambres)
   - `Hotel/images/profiles/` (pour les profils)

2. Les URLs seront automatiquement servies à:
   - `http://localhost:8000/images/rooms/[filename]`
   - `http://localhost:8000/images/profiles/[filename]`

3. Modifier les URLs en base de données via l'interface web

## Notes importantes

- Les chemins de fichiers avec caractères spéciaux (accents) sont supportés
- Les URLs sont relatives à `http://localhost:8000` (à adapter si déploiement)
- Les images externes (autres domaines) sont aussi supportées
- Les modifications d'images sont sauvegardées en base de données
