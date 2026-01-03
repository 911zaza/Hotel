"""
  Web services :
    SOA : Service Oriented Architecture
      - Syntaxe transfert XML (SOAP)
      - Protocoles transfert : http, smtp, ftp ...
    ROA : Rest Oriented Architecture (REST -> RESTful web services)
      - Syntaxe transfert : HTML, TEXT, JSON, XML, Binaire ...
      - Protocoles transfert : http

   client         server      http request:                       Request or Response
       |   Request     |               - GET : Read                        - HEADER
       |   ----------->                - POST : Create                     - BODY (Payload)
           <----------  |               - PUT : Update                      - STATUS CODE RESPONSE
       |    Response   |               - DELETE : Supprimer                 200-299 : OK
                                                                              300-399 : Redirection
                                                                              >= 400  : Error
"""

from fastapi import APIRouter, HTTPException
from business import Hotel
from dto import *
from models import *

# ==========================
# Routers
# ==========================
client_router = APIRouter(prefix="/clients")
room_router = APIRouter(prefix="/rooms")
reservation_router = APIRouter(prefix="/reservations")

# Service métier
service: Hotel = Hotel()

# ==========================
# Clients
# ==========================
@client_router.get("/", response_model=list[ClientResponse])
def get_clients():
    results: list[ClientResponse] = []
    for client in service.list_all_clients():
        results.append(ClientResponse(
            id=client.id,
            name=client.name,
            email=client.email,
            phone=client.phone,
            address=client.address
        ))
    return results


@client_router.post("/", response_model=ClientResponse)
def create_client(clientRequest: ClientRequest):
    client = Client(
        name=clientRequest.name,
        email=clientRequest.email,
        phone=clientRequest.phone,
        address=clientRequest.address
    )
    service.create_client(client)
    return ClientResponse(
        id=client.id,
        name=client.name,
        email=client.email,
        phone=client.phone,
        address=client.address
    )

@client_router.delete("/{client_id}", response_model=dict)
def delete_client(client_id: int):
    success = service.delete_client(client_id)
    if not success:
        # Si le client n'existe pas ou suppression échoue, renvoie une erreur 404
        raise HTTPException(status_code=404, detail=f"Client with id {client_id} not found")
    return {"message": f"Client with id {client_id} has been deleted"}

# ==========================
# Rooms
# ==========================
@room_router.get("/", response_model=list[RoomResponse])
def get_rooms():
    results: list[RoomResponse] = []
    for room in service.list_all_rooms():
        results.append(RoomResponse(
            id=room.id,
            room_number=room.number,                     # number
            room_type=room.type,                         # type
            price_per_night=room.price,                 # price
            is_available=(room.status == "available")  # status -> bool
        ))
    return results


@room_router.post("/", response_model=RoomResponse)
def create_room(roomRequest: RoomRequest):
    room = Room(
        number=roomRequest.room_number,
        type=roomRequest.room_type,
        price=roomRequest.price_per_night,
        status="available"
    )
    service.create_room(room)
    return RoomResponse(
        id=room.id,
        room_number=room.number,
        room_type=room.type,
        price_per_night=room.price,
        is_available=(room.status == "available")
    )


@room_router.delete("/{id}")
def delete_room(id: int):
    deleted_ok = service.delete_room(id)
    if deleted_ok:
        return {"message": "Room deleted successfully"}
    raise HTTPException(status_code=404, detail="Room not found")

# ==========================
# Reservations
# ==========================
@reservation_router.get("/", response_model=list[ReservationResponse])
def get_reservations():
    results: list[ReservationResponse] = []
    for reservation in service.list_all_reservations():
        results.append(ReservationResponse(
            id=reservation.id,
            client_id=reservation.client_id,
            room_id=reservation.room_id,
            check_in=reservation.check_in,
            check_out=reservation.check_out,
            #status="Confirmée"  # Statut par défaut
        ))
    return results

@reservation_router.post("/", response_model=ReservationResponse)
def create_reservation(reservationRequest: ReservationRequest):
    reservation = Reservation(
        client_id=reservationRequest.client_id,
        room_id=reservationRequest.room_id,
        check_in=reservationRequest.check_in,
        check_out=reservationRequest.check_out,
    )
    service.create_reservation(reservation)
    return ReservationResponse(
        id=reservation.id,
        client_id=reservation.client_id,
        room_id=reservation.room_id,
        check_in=reservation.check_in,
        check_out=reservation.check_out
        # status=reservation.status  # si tu l’as supprimé dans SQLAlchemy
    )

