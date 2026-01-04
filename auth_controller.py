"""
Auth Controller - Gestion de l'authentification
"""
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from config import Sessionlocal
from auth_dal import UserDao, hash_password, verify_password
from models import User
from dto import UserRegisterRequest, UserLoginRequest, UserResponse, TokenResponse
from datetime import datetime, timedelta
import secrets

# Router pour l'authentification
auth_router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer()

# Simple token storage (dans un vrai projet, utiliser JWT avec python-jose)
user_tokens = {}  # token -> user_id


def get_db():
    db = Sessionlocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)) -> User:
    """Récupère l'utilisateur actuel depuis le token"""
    token = credentials.credentials
    user_id = user_tokens.get(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Token invalide")
    
    user_dao = UserDao(db)
    user = user_dao.find_by_id(user_id)
    if not user:
        raise HTTPException(status_code=401, detail="Utilisateur non trouvé")
    
    return user


@auth_router.post("/register", response_model=UserResponse)
def register(user_data: UserRegisterRequest, db: Session = Depends(get_db)):
    """Inscription d'un nouvel utilisateur"""
    user_dao = UserDao(db)
    
    # Vérifier si username existe déjà
    if user_dao.find_by_username(user_data.username):
        raise HTTPException(status_code=400, detail="Ce nom d'utilisateur existe déjà")
    
    # Vérifier si email existe déjà
    if user_dao.find_by_email(user_data.email):
        raise HTTPException(status_code=400, detail="Cet email existe déjà")
    
    # Créer l'utilisateur
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        password_hash=hash_password(user_data.password),
        role="client",  # Par défaut client
        name=user_data.name,
        phone=user_data.phone,
        address=user_data.address
    )
    
    if not user_dao.create_user(new_user):
        raise HTTPException(status_code=500, detail="Erreur lors de la création de l'utilisateur")
    
    return UserResponse(
        id=new_user.id,
        username=new_user.username,
        email=new_user.email,
        role=new_user.role,
        name=new_user.name,
        phone=new_user.phone,
        address=new_user.address,
        created_at=new_user.created_at
    )


@auth_router.post("/login", response_model=TokenResponse)
def login(login_data: UserLoginRequest, db: Session = Depends(get_db)):
    """Connexion d'un utilisateur"""
    user_dao = UserDao(db)
    
    # Chercher l'utilisateur par username
    user = user_dao.find_by_username(login_data.username)
    if not user:
        raise HTTPException(status_code=401, detail="Nom d'utilisateur ou mot de passe incorrect")
    
    # Vérifier le mot de passe
    if not verify_password(login_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Nom d'utilisateur ou mot de passe incorrect")
    
    # Générer un token simple (dans un vrai projet, utiliser JWT)
    token = secrets.token_urlsafe(32)
    user_tokens[token] = user.id
    
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse(
            id=user.id,
            username=user.username,
            email=user.email,
            role=user.role,
            name=user.name,
            phone=user.phone,
            address=user.address,
            created_at=user.created_at
        )
    )


@auth_router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Récupère les informations de l'utilisateur connecté"""
    return UserResponse(
        id=current_user.id,
        username=current_user.username,
        email=current_user.email,
        role=current_user.role,
        name=current_user.name,
        phone=current_user.phone,
        address=current_user.address,
        created_at=current_user.created_at
    )


@auth_router.post("/logout")
def logout(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Déconnexion de l'utilisateur"""
    token = credentials.credentials
    if token in user_tokens:
        del user_tokens[token]
    return {"message": "Déconnexion réussie"}

