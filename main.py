from business import Hotel
from config import Base, Sessionlocal, engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import uvicorn
from controllers import client_router, room_router, reservation_router
from auth_controller import auth_router
from controllers import plat_router


# Création de l'application FastAPI
app = FastAPI(
    title="API Hotel Management",
    description="v1.0 - Gestion des clients, chambres et réservations"
)


# Configuration CORS pour permettre les requêtes depuis React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # URL du frontend React
    allow_credentials=True,
    allow_methods=["*"],  # Permet tous les méthodes HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permet tous les headers
)

# Inclusion des routers
app.include_router(auth_router)
app.include_router(client_router)
app.include_router(room_router)
app.include_router(reservation_router)

# Exemple de route simple pour tester
@app.get("/date")
def now():
    return {
        "message": "Hello from FastAPI Hotel",
        "date": datetime.now()
    }

app.include_router(plat_router)


# Création des tables une seule fois
def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
    uvicorn.run("main:app", host="0.0.0.0", port=9090, reload=True)
    # 0.0.0.0 : accepte toutes les IP disponibles
    # port=9090 : tu peux changer si occupé (par défaut 8000)
    # reload=True : recharge automatique quand tu modifies ton code
