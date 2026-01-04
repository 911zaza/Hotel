from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from config import Base

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
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

    def __repr__(self):
        return f"<User(id={self.id}, username={self.username}, email={self.email}, role={self.role})>"
