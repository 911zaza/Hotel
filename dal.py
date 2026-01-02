from sqlalchemy.orm import Session
from entities import Client, Room, Reservation
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


class RoomDao:
    def __init__(self, session: Session):
        self.session = session

    def create_room(self, room: Room):
        self.session.add(room)
        try:
            self.session.commit()
            self.session.refresh(room)
        except:
            self.session.rollback()
            return False
        return True

    def get_all_rooms(self):
        return self.session.query(Room).all()

    def delete(self, id: int):
        filtred_room = self.session.query(Room).filter(Room.id == id).one_or_none()
        if filtred_room:
            self.session.delete(filtred_room)
            self.session.commit()
            return True
        return False


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