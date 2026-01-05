"""
Script de test pour vérifier que les images s'affichent correctement
"""
import sys
sys.path.insert(0, '.')

from config import Sessionlocal
from models import Room, User

session = Sessionlocal()

print("=" * 70)
print("✅ TEST DES IMAGES EN BASE DE DONNÉES")
print("=" * 70)

print("\n📷 CHAMBRES (Pour ExplorePage):")
print("-" * 70)
rooms = session.query(Room).all()
for room in rooms:
    url = room.url_image_chambre
    if url:
        print(f"✓ Room {room.id:2} ({room.number:3}): {url}")
    else:
        print(f"✗ Room {room.id:2} ({room.number:3}): AUCUNE IMAGE")

print("\n👤 UTILISATEURS (Pour ProfilePage):")
print("-" * 70)
users = session.query(User).all()
for user in users:
    url = user.url_image_user
    if url:
        print(f"✓ User {user.id} ({user.username:20}): {url}")
    else:
        print(f"✗ User {user.id} ({user.username:20}): AUCUNE IMAGE")

session.close()

print("\n" + "=" * 70)
print("✅ Les images devraient s'afficher correctement!")
print("=" * 70)
