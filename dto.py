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
    check_in_date: datetime
    check_out_date: datetime

class ReservationResponse(BaseModel):
    id: int
    client_id: int
    room_id: int
    check_in_date: datetime
    check_out_date: datetime
    status: str
    created_at: datetime | None = None
    updated_at: datetime | None = None
