"""
Script pour initialiser les images des chambres et profils dans la base de données
Exécuter après avoir copié les images dans les dossiers
"""
import os
from config import Sessionlocal, engine, Base
from models import Room, User

# URLs des images de chambres (servies depuis /images/rooms/)
room_images = [
    "http://localhost:8000/images/rooms/téléchargement.jpeg",
    "http://localhost:8000/images/rooms/téléchargement (1).jpeg",
    "http://localhost:8000/images/rooms/téléchargement (2).jpeg",
    "http://localhost:8000/images/rooms/téléchargement (3).jpeg",
    "http://localhost:8000/images/rooms/téléchargement (4).jpeg",
    "http://localhost:8000/images/rooms/téléchargement (5).jpeg",
    "http://localhost:8000/images/rooms/téléchargement (6).jpeg",
    "http://localhost:8000/images/rooms/téléchargement (7).jpeg",
    "http://localhost:8000/images/rooms/téléchargement (8).jpeg",
    "http://localhost:8000/images/rooms/téléchargement (9).jpeg",
]

# URLs des images de profil (servies depuis /images/profiles/)
profile_images = [
    "http://localhost:8000/images/profiles/téléchargement.jpeg",
    "http://localhost:8000/images/profiles/téléchargement (1).jpeg",
    "http://localhost:8000/images/profiles/téléchargement (2).jpeg",
    "http://localhost:8000/images/profiles/téléchargement (10).jpeg",
]

def init_images():
    """
    Assign default images to all rooms and users in the database
    """
    session = Sessionlocal()
    try:
        # Update rooms with images
        rooms = session.query(Room).all()
        for idx, room in enumerate(rooms):
            room.url_image_chambre = room_images[idx % len(room_images)]
        
        # Update users with images (but not the admin user)
        users = session.query(User).all()
        for idx, user in enumerate(users):
            # Skip admin users or keep existing image if already set
            if user.role != 'admin' and not user.url_image_user:
                user.url_image_user = profile_images[idx % len(profile_images)]
        
        session.commit()
        print(f"✅ Images initialisées: {len(rooms)} chambres et {len(users)} utilisateurs")
        
    except Exception as e:
        session.rollback()
        print(f"❌ Erreur lors de l'initialisation: {e}")
    finally:
        session.close()

if __name__ == "__main__":
    init_images()
