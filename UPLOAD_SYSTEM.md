# Système d'Upload d'Images - Hotel Management

## 🎯 Fonctionnalités

### ✅ Upload d'images de profil (Utilisateurs)
- Les utilisateurs peuvent charger une image depuis leur appareil
- L'image est automatiquement sauvegardée et l'URL est stockée en base de données
- L'image s'affiche immédiatement dans le profil

### ✅ Upload d'images de chambres (Admins)
- Les admins peuvent charger une image pour chaque chambre
- L'image est automatiquement sauvegardée et l'URL est stockée en base de données
- L'image s'affiche immédiatement dans la liste des chambres

## 📁 Architecture

```
Hotel/
├── images/
│   ├── rooms/          # Images des chambres (servies automatiquement)
│   └── profiles/       # Images des profils (servies automatiquement)
├── main.py             # Configuration StaticFiles
├── image_utils.py      # Fonctions utilitaires d'upload
├── auth_controller.py  # Endpoint: POST /auth/upload-profile-image
├── controllers.py      # Endpoint: POST /rooms/upload-image
└── migrate_images.py   # Script de migration (optionnel)
```

## 🚀 Configuration initiale

### 1. Faire une première migration (recommandé)

Si vous avez déjà des images en base de données avec des chemins Windows:

```bash
python migrate_images.py
```

Ceci convertira les URLs locales en URLs HTTP:
- `C:\Users\HP\OneDrive\Bureau\images_chambre\téléchargement.jpeg` → `http://localhost:8000/images/rooms/téléchargement.jpeg`

### 2. Redémarrer le backend

```bash
python main.py
```

## 📱 Utilisation

### Pour les utilisateurs (profil)

1. Aller à **Mon Profil → Modifier**
2. Cliquer sur "Choisir une image"
3. Sélectionner une image depuis votre appareil (.jpg, .jpeg, .png, .gif, .webp)
4. L'image s'affichera immédiatement

### Pour les admins (chambres)

1. Aller à **Chambres → Ajouter/Modifier**
2. Remplir les informations de la chambre
3. Cliquer sur "Choisir une image"
4. Sélectionner une image depuis votre appareil
5. Enregistrer la chambre

## 🔧 Points de terminaison API

### Upload image de profil (utilisateur)
```
POST /auth/upload-profile-image
Content-Type: multipart/form-data
Authorization: Bearer {token}

Body:
file: <binary image data>

Response:
{
  "image_url": "http://localhost:8000/images/profiles/profile_..._....jpeg",
  "message": "Image de profil mise à jour avec succès"
}
```

### Upload image de chambre (admin)
```
POST /rooms/upload-image
Content-Type: multipart/form-data
Authorization: Bearer {token}
Role: admin

Body:
file: <binary image data>

Response:
{
  "image_url": "http://localhost:8000/images/rooms/room_..._....jpeg",
  "message": "Image de chambre sauvegardée avec succès"
}
```

## 📊 Base de données

### Table `user`
- `url_image_user` (TEXT, nullable) - URL de l'image de profil

### Table `room`
- `url_image_chambre` (TEXT, nullable) - URL de l'image de la chambre

## 🛡️ Sécurité

- **Authentification requise** pour tous les uploads
- **Restrictions admin** pour les images de chambres
- **Formats autorisés**: .jpg, .jpeg, .png, .gif, .webp
- **Taille maximale**: 5 MB par image
- **Noms de fichiers uniques** générés automatiquement pour éviter les conflits

## 🔄 Flux d'upload

1. **Frontend** → Utilisateur choisit une image
2. **Frontend** → Envoie la requête multipart/form-data
3. **Backend** → Valide le fichier et génère un nom unique
4. **Backend** → Sauvegarde l'image dans `/images/rooms/` ou `/images/profiles/`
5. **Backend** → Retourne l'URL HTTP
6. **Frontend** → Affiche un aperçu de l'image
7. **Frontend** → Utilisateur enregistre les modifications
8. **Backend** → Sauvegarde l'URL en base de données

## 🖼️ Formats supportés
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

Taille maximale: **5 MB**

## ⚙️ Configuration

Pour modifier la taille maximale ou les formats autorisés, éditer `image_utils.py`:

```python
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB
```

## 🐛 Dépannage

### L'image ne s'affiche pas
- Vérifier que le backend est lancé sur `http://localhost:8000`
- Vérifier que le fichier existe dans `/images/rooms/` ou `/images/profiles/`
- Vérifier la console du navigateur pour les erreurs

### Erreur lors de l'upload
- Vérifier le format de l'image (doit être .jpg, .png, .gif ou .webp)
- Vérifier la taille du fichier (max 5 MB)
- Vérifier la connexion authentification

### Migration des anciennes images
```bash
python migrate_images.py
```

## 📝 Notes

- Les anciennes URLs locales Windows sont progressivement remplacées par les URLs HTTP
- Les images sont servies statiquement via FastAPI et CORS est configuré pour le frontend
- Les uploads multiples sur le même utilisateur/chambre remplacent l'image précédente
