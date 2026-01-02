from datetime import datetime
from typing import Final
import config
from abc import ABC, abstractmethod


class Room(ABC):
    num: int = 0  # compteur statique

    def __init__(self, price: float = 0.0):
        self._price: float = price
        Room.num += 1
        self.num_room: Final[int] = Room.num
        self._is_available: bool = True

    @abstractmethod
    def reserve(self, customer: 'Client', check_in: datetime, check_out: datetime) -> bool:
        pass

    def release(self) -> None:
        self._is_available = True

    def is_available(self) -> bool:
        return self._is_available

    def __str__(self):
        return f'{self.num_room:<10d}{self._price:10.2f}'


class SingleRoom(Room):
    def __init__(self, price: float = 50.0):
        super().__init__(price)

    def reserve(self, customer: 'Client', check_in: datetime, check_out: datetime) -> bool:
        if self._is_available:
            self._is_available = False
            return True
        return False


class DoubleRoom(Room):
    def __init__(self, price: float = 80.0):
        super().__init__(price)

    def reserve(self, customer: 'Client', check_in: datetime, check_out: datetime) -> bool:
        if self._is_available:
            self._is_available = False
            return True
        return False


class SuiteRoom(Room):
    def __init__(self, price: float = 150.0):
        super().__init__(price)

    def reserve(self, customer: 'Client', check_in: datetime, check_out: datetime) -> bool:
        if self._is_available:
            self._is_available = False
            return True
        return False


class Client:
    num: int = 0

    def __init__(self, name: str, email: str):
        Client.num += 1
        self.id: Final[int] = Client.num
        self.name: str = name
        self.email: str = email


class Reservation:
    def __init__(self, client: Client, room: Room, check_in: datetime, check_out: datetime):
        self.client = client
        self.room = room
        self.check_in = check_in
        self.check_out = check_out
        self.status = "Confirmée"

    def __str__(self):
        return f'{self.client.name} a réservé la chambre {self.room.num_room} du {self.check_in} au {self.check_out}'