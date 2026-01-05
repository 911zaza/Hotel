"""
Script pour vérifier les URLs des images en base de données
"""
from config import Sessionlocal
from models import Room, User

session = Sessionlocal()

print("=" * 60)
print("🔍 IMAGES EN BASE DE DONNÉES")
print("=" * 60)

print("\n📷 CHAMBRES:")
rooms = session.query(Room).all()
for room in rooms:
    print(f"  Room {room.id} ({room.number}): {room.url_image_chambre}")

print("\n👤 UTILISATEURS:")
users = session.query(User).all()
for user in users:
    print(f"  User {user.id} ({user.username}): {user.url_image_user}")

session.close()
