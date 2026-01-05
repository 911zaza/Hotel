# 🖼️ Système d'Upload d'Images - Configuration

## Étapes de configuration

### 1️⃣ Migration des images existantes (UNE SEULE FOIS)

Si vous avez déjà des images en base de données avec des chemins Windows, exécutez:

```bash
python migrate_images.py
```

**Cela convertira:**
- `C:\Users\HP\OneDrive\Bureau\images_chambre\...` → `http://localhost:8000/images/rooms/...`
- `C:\Users\HP\OneDrive\Bureau\images_profile\...` → `http://localhost:8000/images/profiles/...`

### 2️⃣ Démarrer le backend

```bash
python main.py
```

Le backend servira maintenant les images depuis:
- `http://localhost:8000/images/rooms/`
- `http://localhost:8000/images/profiles/`

### 3️⃣ Démarrer le frontend

```bash
cd hotel-ui
npm start
```

## ✅ Utilisation

### Modifier image de profil (utilisateurs)
1. Cliquer sur "Modifier" dans **Mon Profil**
2. Cliquer sur "Choisir une image"
3. Sélectionner une image depuis votre ordinateur
4. L'image s'affichera immédiatement

### Modifier image de chambre (admins)
1. Cliquer sur "Modifier" dans **Chambres**
2. Cliquer sur "Choisir une image"
3. Sélectionner une image depuis votre ordinateur
4. L'image s'affichera immédiatement

## 📋 Formats supportés
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

**Taille maximale: 5 MB**

## 🔐 Permissions

| Action | Qui | Authentification |
|--------|-----|------------------|
| Uploader image de profil | Utilisateurs | ✅ Oui |
| Uploader image de chambre | Admins | ✅ Oui (Admin required) |

## 📁 Dossiers d'images

```
Hotel/
├── images/
│   ├── rooms/          # Images des chambres
│   └── profiles/       # Images des profils utilisateurs
```

Les images sont **sauvegardées automatiquement** et servies via le backend.

---

**Note**: Vous pouvez maintenant charger et modifier les images directement depuis l'interface web! 🎉
