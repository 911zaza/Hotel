"""
Utilitaires pour la gestion des fichiers d'images
"""
import os
import shutil
from pathlib import Path
from fastapi import UploadFile, HTTPException

# Chemins des dossiers d'images
BASE_IMAGE_DIR = os.path.join(os.path.dirname(__file__), "images")
ROOM_IMAGES_DIR = os.path.join(BASE_IMAGE_DIR, "rooms")
PROFILE_IMAGES_DIR = os.path.join(BASE_IMAGE_DIR, "profiles")

# Créer les dossiers s'ils n'existent pas
os.makedirs(ROOM_IMAGES_DIR, exist_ok=True)
os.makedirs(PROFILE_IMAGES_DIR, exist_ok=True)

# Extensions autorisées
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB


def is_allowed_file(filename: str) -> bool:
    """Vérifier si l'extension du fichier est autorisée"""
    return Path(filename).suffix.lower() in ALLOWED_EXTENSIONS


def save_room_image(upload_file: UploadFile) -> str:
    """
    Sauvegarder une image de chambre et retourner son URL
    """
    if not is_allowed_file(upload_file.filename):
        raise HTTPException(
            status_code=400,
            detail=f"Format non autorisé. Utilisez: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    try:
        # Créer un nom de fichier unique
        filename = f"room_{Path(upload_file.filename).stem}_{int(os.urandom(4).hex(), 16)}{Path(upload_file.filename).suffix}"
        filepath = os.path.join(ROOM_IMAGES_DIR, filename)
        
        # Sauvegarder le fichier
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(upload_file.file, buffer)
        
            # Construire l'URL publique en utilisant la base configurée (ou fallback)
            api_base = os.environ.get("API_BASE", "http://127.0.0.1:9090").rstrip("/")
            return f"{api_base}/images/rooms/{filename}"
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la sauvegarde: {str(e)}")


def save_profile_image(upload_file: UploadFile) -> str:
    """
    Sauvegarder une image de profil et retourner son URL
    """
    if not is_allowed_file(upload_file.filename):
        raise HTTPException(
            status_code=400,
            detail=f"Format non autorisé. Utilisez: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    try:
        # Créer un nom de fichier unique
        filename = f"profile_{Path(upload_file.filename).stem}_{int(os.urandom(4).hex(), 16)}{Path(upload_file.filename).suffix}"
        filepath = os.path.join(PROFILE_IMAGES_DIR, filename)
        
        # Sauvegarder le fichier
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(upload_file.file, buffer)
        
        # Construire l'URL publique en utilisant la base configurée (ou fallback)
        api_base = os.environ.get("API_BASE", "http://127.0.0.1:9090").rstrip("/")
        return f"{api_base}/images/profiles/{filename}"
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la sauvegarde: {str(e)}")


def delete_image_file(image_url: str) -> None:
    """
    Supprimer un fichier image basé sur son URL
    """
    try:
        if not image_url:
            return
        api_base = os.environ.get("API_BASE", "http://127.0.0.1:9090").rstrip("/")
        prefix = f"{api_base}/images/"
        if not image_url.startswith(prefix) and not image_url.startswith("/images/"):
            return
        
        # Extraire le chemin du fichier depuis l'URL
        if "/images/rooms/" in image_url:
            filename = image_url.split("/images/rooms/")[-1]
            filepath = os.path.join(ROOM_IMAGES_DIR, filename)
        elif "/images/profiles/" in image_url:
            filename = image_url.split("/images/profiles/")[-1]
            filepath = os.path.join(PROFILE_IMAGES_DIR, filename)
        else:
            return
        
        if os.path.exists(filepath):
            os.remove(filepath)
    except Exception as e:
        print(f"Erreur lors de la suppression de l'image: {e}")
