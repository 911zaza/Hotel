import datetime
from sqlalchemy.orm import Session
from models import User
from typing import Optional
import hashlib


class UserDao:
    def __init__(self, session: Session):
        self.session = session

    def create_user(self, user: User) -> bool:
        self.session.add(user)
        try:
            self.session.commit()
            self.session.refresh(user)
            return True
        except Exception as e:
            self.session.rollback()
            print(f"Error creating user: {e}")
            return False

    def find_by_username(self, username: str) -> Optional[User]:
        return self.session.query(User).filter(User.username == username).first()

    def find_by_email(self, email: str) -> Optional[User]:
        return self.session.query(User).filter(User.email == email).first()

    def find_by_id(self, user_id: int) -> Optional[User]:
        return self.session.query(User).filter(User.id == user_id).first()

    def update_user(self, user_id: int, user_data: dict) -> bool:
        user = self.find_by_id(user_id)
        if not user:
            return False
        try:
            for key, value in user_data.items():
                setattr(user, key, value)
            user.updated_at = datetime.datetime.now()
            self.session.commit()
            self.session.refresh(user)
            return True
        except Exception as e:
            self.session.rollback()
            print(f"Error updating user: {e}")
            return False

#hashe pass
def hash_password(password: str) -> str:
    """Hash password using SHA256 (simple hash for demo - use bcrypt in production)"""
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    return hash_password(plain_password) == hashed_password

