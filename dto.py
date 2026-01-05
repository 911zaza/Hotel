from pydantic import BaseModel, Field, EmailStr
from datetime import datetime

# ==========================
# CLIENT DTO
# ==========================
class ClientRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    phone: str = Field(..., min_length=8, max_length=15)
    address: str = Field(..., min_length=5, max_length=100)

class ClientResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: str
    address: str
    created_at: datetime | None = None
    updated_at: datetime | None = None


# ==========================
# ROOM DTO
# ==========================
class RoomRequest(BaseModel):
    room_number: str = Field(..., min_length=1, max_length=10)
    room_type: str = Field(..., pattern="^(single|double|suite)$")  # validation stricte
    price_per_night: float = Field(..., gt=0)

class RoomResponse(BaseModel):
    id: int
    room_number: str
    room_type: str
    price_per_night: float
    is_available: bool
    created_at: datetime | None = None
    updated_at: datetime | None = None


# ==========================
# RESERVATION DTO
# ==========================
class ReservationRequest(BaseModel):
    client_id: int
    room_id: int
    check_in: datetime
    check_out: datetime

class ReservationResponse(BaseModel):
    id: int
    client_id: int
    room_id: int
    check_in: datetime
    check_out: datetime
    created_at: datetime | None = None
    updated_at: datetime | None = None


# ==========================
# USER DTO
# ==========================
class UserRegisterRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    name: str | None = Field(None, max_length=100)
    phone: str | None = Field(None, max_length=15)
    address: str | None = Field(None, max_length=200)

class UserLoginRequest(BaseModel):
    username: str
    password: str


class UserUpdateRequest(BaseModel):
    name: str | None = Field(None, max_length=100)
    email: EmailStr | None = None
    phone: str | None = Field(None, min_length=8, max_length=15)
    address: str | None = Field(None, min_length=5, max_length=200)

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str
    name: str | None = None
    phone: str | None = None
    address: str | None = None
    created_at: datetime | None = None

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# ==========================
# PLAT DTO (Restaurant)
# ==========================
class PlatRequest(BaseModel):
    nom_plat: str = Field(..., min_length=2, max_length=100)
    type_plat: str = Field(..., min_length=3, max_length=50)
    prix_plat: float = Field(..., gt=0)
    ingredient_plat: str = Field(..., min_length=3)
    disponibilite: bool = True


class PlatResponse(BaseModel):
    id: int
    nom_plat: str
    type_plat: str
    prix_plat: float
    ingredient_plat: str
    disponibilite: bool
    created_at: datetime | None = None
    updated_at: datetime | None = None


# ==========================
# COMMANDE PLAT DTO
# ==========================
class CommandePlatRequest(BaseModel):
    id_client: int
    id_plat: int
    nom_plat: str
    nb_deplat: int = Field(..., gt=0)
    date_a_manger: datetime


class CommandePlatResponse(BaseModel):
    id_commande: int
    client_id: int
    nom_plat: str
    nb_deplat: int
    date_commande: datetime
    date_a_manger: datetime


# ==========================
# EVENEMENT DTO
# ==========================
class EvenementRequest(BaseModel):
    nom_evenement: str
    date_evenement: datetime
    duree_evenement: str | None = None  # "05:00:00"
    prix_evenement: float


class EvenementResponse(BaseModel):
    id_evenement: int
    nom_evenement: str
    date_evenement: datetime
    duree_evenement: str | None = None
    prix_evenement: float
    created_at: datetime | None = None
    updated_at: datetime | None = None
