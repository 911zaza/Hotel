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
           <----------  |              - PUT : Update                      - STATUS CODE RESPONSE
       |    Response   |               - DELETE : Supprimer                 200-299 : OK
                                                                              300-399 : Redirection
                                                                              >= 400  : Error
"""

from datetime import timedelta
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
plat_router = APIRouter(prefix="/plats")
commande_router = APIRouter(prefix="/commandes")
evenement_router = APIRouter(prefix="/evenements")

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


# Get client by ID
@client_router.get("/{client_id}", response_model=ClientResponse)
def get_client_by_id(client_id: int):
    client = service.client_dao.find_by_id(client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return ClientResponse(
        id=client.id,
        name=client.name,
        email=client.email,
        phone=client.phone,
        address=client.address
    )


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


@client_router.put("/{client_id}", response_model=ClientResponse)
def update_client(client_id: int, client_request: ClientRequest):
    updated_client = Client(
        name=client_request.name,
        email=client_request.email,
        phone=client_request.phone,
        address=client_request.address
    )
    success = service.update_client(client_id, updated_client)
    if not success:
        raise HTTPException(status_code=404, detail=f"Client with id {client_id} not found")

    client = service.client_dao.find_by_id(client_id)
    return ClientResponse(
        id=client.id,
        name=client.name,
        email=client.email,
        phone=client.phone,
        address=client.address
    )




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

@room_router.put("/{room_id}", response_model=RoomResponse)
def update_room(room_id: int, roomRequest: RoomRequest):
    updated_room = Room(
        number=roomRequest.room_number,
        type=roomRequest.room_type,
        price=roomRequest.price_per_night,
        status="available"
    )
    success = service.update_room(room_id, updated_room)
    if not success:
        raise HTTPException(status_code=404, detail="Room not found")

    room = service.room_dao.session.query(Room).get(room_id)
    return RoomResponse(
        id=room.id,
        room_number=room.number,
        room_type=room.type,
        price_per_night=room.price,
        is_available=(room.status == "available")
    )


@room_router.get("/price-range/", response_model=list[RoomResponse])
def get_rooms_by_price(min_price: float, max_price: float):
    rooms = service.get_rooms_by_price_range(min_price, max_price)
    return [
        RoomResponse(
            id=r.id,
            room_number=r.number,
            room_type=r.type,
            price_per_night=r.price,
            is_available=(r.status == "available")
        ) for r in rooms
    ]



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

@reservation_router.get("/client/{client_id}", response_model=list[ReservationResponse])
def get_reservations_by_client(client_id: int):
    reservations = service.find_reservations_by_id_client(client_id)
    return [
        ReservationResponse(
            id=r.id,
            client_id=r.client_id,
            room_id=r.room_id,
            check_in=r.check_in,
            check_out=r.check_out
        ) for r in reservations
    ]


@reservation_router.delete("/{reservation_id}/client/{client_id}")
def cancel_reservation(reservation_id: int, client_id: int):
    success = service.cancel_reservation_byid_client(reservation_id, client_id)
    if not success:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return {"message": "Reservation cancelled successfully"}


@reservation_router.get("/check-availability/")
def check_room_availability(room_id: int, check_in: datetime, check_out: datetime):
    available = service.check_room_availability(room_id, check_in, check_out)
    return {"available": available}


# ==========================
# Plats (Restaurant)
# ==========================
@plat_router.get("/", response_model=list[PlatResponse])
def get_plats():
    return [
        PlatResponse(
            id=p.id,
            nom_plat=p.nom_plat,
            type_plat=p.type_plat,
            prix_plat=p.prix_plat,
            ingredient_plat=p.ingredient_plat,
            disponibilite=p.disponibilite
        ) for p in service.list_all_plats()
    ]


@plat_router.post("/", response_model=PlatResponse)
def create_plat(platRequest: PlatRequest):
    plat = Plat(**platRequest.dict())
    service.create_plat(plat)
    return PlatResponse(
        id=plat.id,
        nom_plat=plat.nom_plat,
        type_plat=plat.type_plat,
        prix_plat=plat.prix_plat,
        ingredient_plat=plat.ingredient_plat,
        disponibilite=plat.disponibilite
    )


@plat_router.put("/{plat_id}", response_model=PlatResponse)
def update_plat(plat_id: int, platRequest: PlatRequest):
    plat = Plat(**platRequest.dict())
    success = service.update_plat(plat_id, plat)
    if not success:
        raise HTTPException(status_code=404, detail="Plat not found")

    updated = service.plat_dao.find_by_id(plat_id)
    return PlatResponse(
        id=updated.id,
        nom_plat=updated.nom_plat,
        type_plat=updated.type_plat,
        prix_plat=updated.prix_plat,
        ingredient_plat=updated.ingredient_plat,
        disponibilite=updated.disponibilite
    )


@plat_router.delete("/{plat_id}")
def delete_plat(plat_id: int):
    if not service.delete_plat(plat_id):
        raise HTTPException(status_code=404, detail="Plat not found")
    return {"message": "Plat supprimé avec succès"}



# Créer une commande
@commande_router.post("/")
def create_commande(data: CommandePlatRequest):
    c = CommandePlat(
        id_client=data.id_client,
        id_plat=data.id_plat,
        nom_plat=data.nom_plat,
        nb_deplat=data.nb_deplat,
        date_commande=datetime.now().date(),
        date_a_manger=data.date_a_manger.date()
    )
    service.create_commande_plat(c)
    return {"message": "Commande ajoutée", "id_commande": c.id_commande}

# Supprimer une commande
@commande_router.delete("/{id_commande}")
def delete_commande(id_commande: int):
    if not service.delete_commande_plat(id_commande):
        raise HTTPException(status_code=404, detail="Commande not found")
    return {"message": "Commande supprimée"}

# Modifier une commande
@commande_router.put("/{id_commande}")
def update_commande(id_commande: int, data: CommandePlatRequest):
    c = CommandePlat(
        id_client=data.id_client,
        id_plat=data.id_plat,
        nom_plat=data.nom_plat,
        nb_deplat=data.nb_deplat,
        date_a_manger=data.date_a_manger.date()
    )
    if not service.update_commande_plat(id_commande, c):
        raise HTTPException(status_code=404, detail="Commande not found")
    return {"message": "Commande modifiée"}

# Récupérer toutes les commandes
@commande_router.get("/", response_model=list[CommandePlatResponse])
def get_all_commandes():
    commandes = service.commande_dao.session.query(CommandePlat).all()
    return [
        CommandePlatResponse(
            id_commande=c.id_commande,
            client_id=c.id_client,
            nom_plat=c.nom_plat,
            nb_deplat=c.nb_deplat,
            date_commande=c.date_commande,
            date_a_manger=c.date_a_manger
        ) for c in commandes
    ]

# Récupérer commandes par client
@commande_router.get("/client/{client_id}", response_model=list[CommandePlatResponse])
def get_commande_client(client_id: int):
    commandes = service.get_commande_by_client(client_id)
    return [
        CommandePlatResponse(
            id_commande=c.id_commande,
            client_id=c.id_client,
            nom_plat=c.nom_plat,
            nb_deplat=c.nb_deplat,
            date_commande=c.date_commande,
            date_a_manger=c.date_a_manger
        ) for c in commandes
    ]

# Récupérer commandes par date
@commande_router.get("/date/", response_model=list[CommandePlatResponse])
def get_commande_date(date: datetime):
    commandes = service.get_commande_by_date(date.date())
    return [
        CommandePlatResponse(
            id_commande=c.id_commande,
            client_id=c.id_client,
            nom_plat=c.nom_plat,
            nb_deplat=c.nb_deplat,
            date_commande=c.date_commande,
            date_a_manger=c.date_a_manger
        ) for c in commandes
    ]





# Créer un événement
@evenement_router.post("/")
def create_evenement(data: EvenementRequest):
    duree = None
    if data.duree_evenement:
        if isinstance(data.duree_evenement, str):
            h, m, s = map(int, data.duree_evenement.split(":"))
            duree = timedelta(hours=h, minutes=m, seconds=s)
        else:
            duree = timedelta(hours=int(data.duree_evenement))  # si juste un nombre d'heures

    e = Evenement(
        nom_evenement=data.nom_evenement,
        date_evenement=data.date_evenement.date(),
        duree_evenement=duree,
        prix_evenement=data.prix_evenement
    )
    service.create_evenement(e)
    return {"message": "Evenement ajouté", "id_evenement": e.id_evenement}

# Supprimer un événement
@evenement_router.delete("/{id_evenement}")
def delete_evenement(id_evenement: int):
    if not service.delete_evenement(id_evenement):
        raise HTTPException(status_code=404, detail="Evenement not found")
    return {"message": "Evenement supprimé"}

# Modifier un événement
@evenement_router.put("/{id_evenement}")
def update_evenement(id_evenement: int, data: EvenementRequest):
    duree = None
    if data.duree_evenement:
        if isinstance(data.duree_evenement, str):
            h, m, s = map(int, data.duree_evenement.split(":"))
            duree = timedelta(hours=h, minutes=m, seconds=s)
        else:
            duree = timedelta(hours=int(data.duree_evenement))

    e = Evenement(
        nom_evenement=data.nom_evenement,
        date_evenement=data.date_evenement.date(),
        duree_evenement=duree,
        prix_evenement=data.prix_evenement
    )
    if not service.update_evenement(id_evenement, e):
        raise HTTPException(status_code=404, detail="Evenement not found")
    return {"message": "Evenement modifié"}

# Récupérer tous les événements
@evenement_router.get("/", response_model=list[EvenementResponse])
def get_evenements():
    events = service.evenement_dao.session.query(Evenement).all()
    return [
        EvenementResponse(
            id_evenement=e.id_evenement,
            nom_evenement=e.nom_evenement,
            date_evenement=e.date_evenement,
            duree_evenement=str(e.duree_evenement) if e.duree_evenement else None,
            prix_evenement=float(e.prix_evenement),
            created_at=e.created_at,
            updated_at=e.updated_at
        ) for e in events
    ]

# Récupérer un événement par ID
@evenement_router.get("/{id_evenement}", response_model=EvenementResponse)
def get_evenement(id_evenement: int):
    e = service.get_evenement_by_id(id_evenement)
    if not e:
        raise HTTPException(status_code=404, detail="Evenement not found")
    return EvenementResponse(
        id_evenement=e.id_evenement,
        nom_evenement=e.nom_evenement,
        date_evenement=e.date_evenement,
        duree_evenement=str(e.duree_evenement) if e.duree_evenement else None,
        prix_evenement=float(e.prix_evenement),
        created_at=e.created_at,
        updated_at=e.updated_at
    )