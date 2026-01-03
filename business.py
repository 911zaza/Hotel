from entities import Client, Room, Reservation
from models import Room

from dal import ClientDao, RoomDao, ReservationDao
from config import Sessionlocal


class Hotel:
    def __init__(self, session=None):
        if session is None:
            session = Sessionlocal()
        self.client_dao = ClientDao(session)
        self.room_dao = RoomDao(session)
        self.reservation_dao = ReservationDao(session)

    def create_client(self, client: Client):
        return self.client_dao.create_client(client)

    def list_all_clients(self):
        return self.client_dao.get_all_clients()

    def get_client_by_id(self, client_id: int) :
        return self.client_dao.find_by_id(client_id)
    
    def delete_client(self, client_id: int) -> bool:
        return self.client_dao.delete_client(client_id)
    

    
    def create_room(self, room: Room):
        return self.room_dao.create_room(room)

    def list_all_rooms(self):
        return self.room_dao.get_all_rooms()

    def delete_room(self, id: int):
        return self.room_dao.delete(id)

    def create_reservation(self, reservation: Reservation):
        return self.reservation_dao.create_reservation(reservation)

    def list_all_reservations(self):
        return self.reservation_dao.get_all_reservations()