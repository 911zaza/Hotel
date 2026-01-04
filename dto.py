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