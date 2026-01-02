from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

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

    reservations = relationship("Reservation", back_populates="client")

    def __repr__(self):
        return f"<Client(id={self.id}, name={self.name}, email={self.email})>"


# ==========================
# Room model (ALIGNÉ AVEC LA DB)
# ==========================
class Room(Base):
    __tablename__ = "room"

    id = Column(Integer, primary_key=True, autoincrement=True)
    number = Column(String, nullable=False, unique=True)
    type = Column(String(50), nullable=False)
    price = Column(Float, nullable=False)
    status = Column(String(20), default="available")
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, onupdate=datetime.now)

    reservations = relationship("Reservation", back_populates="room")

    def __repr__(self):
        return f"<Room(id={self.id}, number={self.number}, type={self.type}, price={self.price})>"


# ==========================
# Reservation model
# ==========================
class Reservation(Base):
    __tablename__ = "reservation"

    id = Column(Integer, primary_key=True, autoincrement=True)
    client_id = Column(Integer, ForeignKey("client.id"), nullable=False)
    room_id = Column(Integer, ForeignKey("room.id"), nullable=False)
    check_in_date = Column(DateTime, nullable=False)
    check_out_date = Column(DateTime, nullable=False)
    status = Column(String(20), default="Confirmée")

    client = relationship("Client", back_populates="reservations")
    room = relationship("Room", back_populates="reservations")

    def __repr__(self):
        return f"<Reservation(id={self.id}, client_id={self.client_id}, room_id={self.room_id})>"


# ==========================
# Classes métier (SANS IMPACT DB)
# ==========================
class SingleRoom(Room):
    def __init__(self, number: str, price: float = 50.0):
        super().__init__(
            number=number,
            type="single",
            price=price,
            status="available"
        )


class DoubleRoom(Room):
    def __init__(self, number: str, price: float = 80.0):
        super().__init__(
            number=number,
            type="double",
            price=price,
            status="available"
        )


class SuiteRoom(Room):
    def __init__(self, number: str, price: float = 150.0):
        super().__init__(
            number=number,
            type="suite",
            price=price,
            status="available"
        )
