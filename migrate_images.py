"""
Migration script pour convertir les URLs locales Windows en URLs HTTP servies par le backend
"""
import os
from pathlib import Path
from config import Sessionlocal, engine, Base
from models import Room, User

def get_filename_from_path(path_str: str) -> str:
    """Extraire le nom du fichier d'un chemin Windows"""
    if not path_str:
        return None
    return Path(path_str).name

def migrate_images():
    """
    Convertir les URLs des images Windows locales en URLs HTTP du backend
    """
    session = Sessionlocal()
    try:
        # Mapping des types d'images
        room_type_map = {
            "images_chambre": "rooms",
            "chambre": "rooms",
        }
        profile_type_map = {
            "images_profile": "profiles",
            "profile": "profiles",
        }
        
        # Migrer les images des chambres
        rooms = session.query(Room).all()
        for room in rooms:
            if room.url_image_chambre and "images_chambre" in room.url_image_chambre:
                filename = get_filename_from_path(room.url_image_chambre)
                if filename:
                    room.url_image_chambre = f"http://localhost:8000/images/rooms/{filename}"
                    print(f"✅ Room {room.id}: {filename}")
        
        # Migrer les images des profils
        users = session.query(User).all()
        for user in users:
            if user.url_image_user and "images_profile" in user.url_image_user:
                filename = get_filename_from_path(user.url_image_user)
                if filename:
                    user.url_image_user = f"http://localhost:8000/images/profiles/{filename}"
                    print(f"✅ User {user.id}: {filename}")
        
        session.commit()
        print(f"\n✅ Migration complétée!")
        
    except Exception as e:
        session.rollback()
        print(f"❌ Erreur lors de la migration: {e}")
    finally:
        session.close()

if __name__ == "__main__":
    migrate_images()
