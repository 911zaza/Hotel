from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from config import Base
from sqlalchemy import Boolean




# ==========================
# Client model
# ==========================
class Client(Base):
    __tablename__ = "client"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False)
    phone = Column(String(15), nullable=False)
    address = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

    reservations = relationship("Reservation", back_populates="client", cascade="all, delete")

    def __repr__(self):
        return f"<Client(id={self.id}, name={self.name}, email={self.email})>"


# ==========================
# Room model
# ==========================
class Room(Base):
    __tablename__ = "room"

    id = Column(Integer, primary_key=True, autoincrement=True)
    number = Column(String, nullable=False)
    type = Column(String(50), nullable=False)
    price = Column(Float, nullable=False)
    status = Column(String(20), default="available")
    url_image_chambre = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

    reservations = relationship("Reservation", back_populates="room", cascade="all, delete")

    def __repr__(self):
        return f"<Room(id={self.id}, number={self.number}, type={self.type})>"


# ==========================
# Reservation model
# ==========================
class Reservation(Base):
    __tablename__ = "reservation"

    id = Column(Integer, primary_key=True, autoincrement=True)
    client_id = Column(Integer, ForeignKey("client.id"), nullable=False)
    room_id = Column(Integer, ForeignKey("room.id"), nullable=False)

    # IMPORTANT : correspond EXACTEMENT aux colonnes PostgreSQL
    check_in = Column(Date, nullable=False)
    check_out = Column(Date, nullable=False)

    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

    client = relationship("Client", back_populates="reservations")
    room = relationship("Room", back_populates="reservations")

    def __repr__(self):
        return f"<Reservation(id={self.id}, client_id={self.client_id}, room_id={self.room_id})>"


# ==========================
# User model
# ==========================
class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), default="client")  # 'admin' or 'client'
    name = Column(String(100))
    phone = Column(String(15))
    address = Column(String(200))
    url_image_user = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

    def __repr__(self):
        return f"<User(id={self.id}, username={self.username}, email={self.email}, role={self.role})>"


# ==========================
# Plat model (Restaurant)
# ==========================
class Plat(Base):
    __tablename__ = "plat"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nom_plat = Column(String(100), nullable=False)
    type_plat = Column(String(50), nullable=False)
    prix_plat = Column(Float, nullable=False)
    ingredient_plat = Column(String, nullable=False)
    disponibilite = Column(Boolean, default=True)

    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

    def __repr__(self):
        return f"<Plat(id={self.id}, nom_plat={self.nom_plat}, prix={self.prix_plat})>"

# ==========================
# Commande Plat model
# ==========================
class CommandePlat(Base):
    __tablename__ = "commande_plat"

    id_commande = Column(Integer, primary_key=True, autoincrement=True)

    id_client = Column(Integer, ForeignKey("client.id"), nullable=False)
    id_plat = Column(Integer, ForeignKey("plat.id"), nullable=False)

    nom_plat = Column(String(100), nullable=False)
    nb_deplat = Column(Integer, nullable=False)

    date_commande = Column(Date, nullable=False)
    date_a_manger = Column(Date, nullable=False)

    client = relationship("Client")
    plat = relationship("Plat")




# ==========================
# Evenement model
# ==========================
class Evenement(Base):
    __tablename__ = "evenement"

    id_evenement = Column(Integer, primary_key=True, autoincrement=True)
    nom_evenement = Column(String(150), nullable=False)
    date_evenement = Column(Date, nullable=False)
    duree_evenement = Column(String, nullable=True) # interval type in PostgreSQL as string
    prix_evenement = Column(Float, nullable=False)

    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)
