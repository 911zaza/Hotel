from models import Client, Room, Reservation

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
    
    def update_client(self, client_id: int, updated_client: Client) -> bool:
        return self.client_dao.update_client(client_id, updated_client)



    def create_room(self, room: Room):
        return self.room_dao.create_room(room)

    def list_all_rooms(self):
        return self.room_dao.get_all_rooms()

    def delete_room(self, id: int):
        return self.room_dao.delete(id)
    
    def update_room(self, room_id: int, room: Room) -> bool:
        return self.room_dao.update_room(room_id, room)

    def get_rooms_by_price_range(self, min_price: float, max_price: float):
        return self.room_dao.get_rooms_by_price_range(min_price, max_price)






    def create_reservation(self, reservation: Reservation):
        return self.reservation_dao.create_reservation(reservation)

    def list_all_reservations(self):
        return self.reservation_dao.get_all_reservations()
    
    def find_reservations_by_id_client(self, client_id: int):
        return self.reservation_dao.find_reservations_by_id_client(client_id)

    def cancel_reservation_byid_client(self, reservation_id: int, client_id: int) -> bool:
        return self.reservation_dao.cancel_reservation_byid_client(reservation_id, client_id)

    def check_room_availability(self, room_id: int, check_in, check_out) -> bool:
        return self.reservation_dao.check_room_availability(room_id, check_in, check_out)