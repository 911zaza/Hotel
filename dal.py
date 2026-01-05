
import datetime
from sqlalchemy.orm import Session
from models import Client, CommandePlat, Evenement, Plat, Room, Reservation
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


# ==========================
# Plat DAO
# ==========================
class PlatDao:
    def __init__(self, session: Session):
        self.session = session

    def create_plat(self, plat: Plat):
        self.session.add(plat)
        try:
            self.session.commit()
            self.session.refresh(plat)
        except:
            self.session.rollback()
            return False
        return True

    def get_all_plats(self):
        return self.session.query(Plat).all()

    def find_by_id(self, plat_id: int):
        return self.session.query(Plat).filter(Plat.id == plat_id).one_or_none()

    def delete_plat(self, plat_id: int) -> bool:
        plat = self.find_by_id(plat_id)
        if not plat:
            return False
        try:
            self.session.delete(plat)
            self.session.commit()
        except:
            self.session.rollback()
            return False
        return True

    def update_plat(self, plat_id: int, updated_plat: Plat) -> bool:
        plat = self.find_by_id(plat_id)
        if not plat:
            return False
        try:
            plat.nom_plat = updated_plat.nom_plat
            plat.type_plat = updated_plat.type_plat
            plat.prix_plat = updated_plat.prix_plat
            plat.ingredient_plat = updated_plat.ingredient_plat
            plat.disponibilite = updated_plat.disponibilite
            self.session.commit()
        except:
            self.session.rollback()
            return False
        return True



# ==========================
# CommandePlat DAO
# ==========================
class CommandePlatDao:
    def __init__(self, session: Session):
        self.session = session

    def create(self, commande: CommandePlat):
        self.session.add(commande)
        self.session.commit()
        self.session.refresh(commande)
        return True

    def delete(self, id_commande: int):
        c = self.session.query(CommandePlat).filter_by(id_commande=id_commande).one_or_none()
        if not c:
            return False
        self.session.delete(c)
        self.session.commit()
        return True

    def update(self, id_commande: int, updated: CommandePlat):
        c = self.session.query(CommandePlat).filter_by(id_commande=id_commande).one_or_none()
        if not c:
            return False
        c.nom_plat = updated.nom_plat
        c.nb_deplat = updated.nb_deplat
        c.date_a_manger = updated.date_a_manger
        self.session.commit()
        return True

    def get_by_client(self, client_id: int):
        return self.session.query(CommandePlat)\
        .filter(CommandePlat.id_client == client_id).all()

    def get_by_date(self, date):
        return self.session.query(CommandePlat).filter_by(date_commande=date).all()


# ==========================
# Evenement DAO
# ==========================
class EvenementDao:
    def __init__(self, session: Session):
        self.session = session

    def create(self, event: Evenement):
        self.session.add(event)
        self.session.commit()
        self.session.refresh(event)
        return True

    def delete(self, id_evenement: int):
        e = self.session.query(Evenement).filter_by(id_evenement=id_evenement).one_or_none()
        if not e:
            return False
        self.session.delete(e)
        self.session.commit()
        return True

    def update(self, id_evenement: int, updated: Evenement):
        e = self.session.query(Evenement).filter_by(id_evenement=id_evenement).one_or_none()
        if not e:
            return False
        e.nom_evenement = updated.nom_evenement
        e.date_evenement = updated.date_evenement
        e.duree_evenement = updated.duree_evenement
        e.prix_evenement = updated.prix_evenement
        self.session.commit()
        return True

    def find_by_id(self, id_evenement: int):
        return self.session.query(Evenement).filter_by(id_evenement=id_evenement).one_or_none()
