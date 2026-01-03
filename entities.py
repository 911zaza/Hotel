# entities.py
from config import Base  # ← Très important : utiliser le même Base partout
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship


class Client(Base):
    __tablename__ = 'client'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    phone = Column(String, nullable=False)
    address = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    reservations = relationship("Reservation", back_populates="client")


class Room(Base):
    __tablename__ = 'room'
    id = Column(Integer, primary_key=True, index=True)
    number = Column(String, unique=True, nullable=False)
    type = Column(String(50), nullable=False)
    price = Column(Float, nullable=False)
    status = Column(String(20), default="available")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    reservations = relationship("Reservation", back_populates="room")


class Reservation(Base):  # ← Version corrigée
    __tablename__ = 'reservation'
    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("client.id"), nullable=False)
    room_id = Column(Integer, ForeignKey("room.id"), nullable=False)
    check_in_date = Column(DateTime, nullable=False)      # ← Ajouté
    check_out_date = Column(DateTime, nullable=False)     # ← Ajouté
    status = Column(String(20), default="Confirmée")      # ← Ajouté (optionnel mais cohérent)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())    # ← Ajouté

    client = relationship("Client", back_populates="reservations")
    room = relationship("Room", back_populates="reservations")