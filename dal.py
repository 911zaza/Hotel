
import datetime
from sqlalchemy.orm import Session
from models import Client, Room, Reservation
from typing import Optional


class ClientDao:
    def __init__(self, session: Session):
        self.session = session

    def create_client(self, client: Client):
        self.session.add(client)
        try:
            self.session.commit()
            self.session.refresh(client)
        except:
            self.session.rollback()
            return False
        return True

    def get_all_clients(self):
        return self.session.query(Client).all()

    def find_by_id(self, id: int) -> Optional[Client]:
        return self.session.query(Client).filter(Client.id == id).one_or_none()
    

    def delete_client(self, id: int) -> bool:
        client = self.find_by_id(id)
        if not client:
            return False  # client introuvable
        try:
            self.session.delete(client)
            self.session.commit()
        except :
            self.session.rollback()
            return False
        return True
    
   
    def update_client(self, client_id: int, updated_client: Client) -> bool:
        client = self.find_by_id(client_id)
        if not client:
            return False
        try:
            client.name = updated_client.name
            client.email = updated_client.email
            client.phone = updated_client.phone
            client.address = updated_client.address
            self.session.commit()
            self.session.refresh(client)
        except :
            self.session.rollback()
            return False
        return True


class RoomDao:
    def __init__(self, session: Session):
        self.session = session

    def create_room(self, room: Room):
        self.session.add(room)
        try:
            self.session.commit()
            self.session.refresh(room)
        except Exception as e:
            print("Erreur création chambre:", e)
            self.session.rollback()
            return False
        return True

    def get_all_rooms(self):
        return self.session.query(Room).all()

    def delete(self, id: int):
        room = self.session.query(Room).filter(Room.id == id).one_or_none()
        if room:
            self.session.delete(room)
            self.session.commit()
            return True
        return False
    

    def update_room(self, room_id: int, updated_room: Room) -> bool:
        room = self.session.query(Room).filter(Room.id == room_id).one_or_none()
        if not room:
            return False
        try:
            room.number = updated_room.number
            room.type = updated_room.type
            room.price = updated_room.price
            room.status = updated_room.status
            self.session.commit()
        except:
            self.session.rollback()
            return False
        return True

    def get_rooms_by_price_range(self, min_price: float, max_price: float):
        return self.session.query(Room).filter(
            Room.price >= min_price,
            Room.price <= max_price
        ).all()
    


class ReservationDao:
    def __init__(self, session: Session):
        self.session = session

    def create_reservation(self, reservation: Reservation):
        self.session.add(reservation)
        try:
            self.session.commit()
            self.session.refresh(reservation)
        except:
            self.session.rollback()
            return False
        return True

    def get_all_reservations(self):
        return self.session.query(Reservation).all()
    

    def find_reservations_by_id_client(self, client_id: int):
        return self.session.query(Reservation).filter(
            Reservation.client_id == client_id
        ).all()

    def cancel_reservation_byid_client(self, reservation_id: int, client_id: int) -> bool:
        reservation = self.session.query(Reservation).filter(
            Reservation.id == reservation_id,
            Reservation.client_id == client_id
        ).one_or_none()

        if not reservation:
            return False

        try:
            self.session.delete(reservation)
            self.session.commit()
        except:
            self.session.rollback()
            return False
        return True

    def check_room_availability(self, room_id: int, check_in, check_out) -> bool:
        conflict = self.session.query(Reservation).filter(
            Reservation.room_id == room_id,
            Reservation.check_in < check_out,
            Reservation.check_out > check_in
        ).first()

        return conflict is None


