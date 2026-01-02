from business import Hotel
from config import Base, Sessionlocal, engine
from fastapi import FastAPI
from datetime import datetime
import uvicorn
from controllers import client_router, room_router, reservation_router

# Création de l'application FastAPI
app = FastAPI(
    title="API Hotel Management",
    description="v1.0 - Gestion des clients, chambres et réservations"
)

# Inclusion des routers
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

# Création des tables une seule fois
def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
    uvicorn.run("main:app", host="0.0.0.0", port=9090, reload=True)
    # 0.0.0.0 : accepte toutes les IP disponibles
    # port=9090 : tu peux changer si occupé (par défaut 8000)
    # reload=True : recharge automatique quand tu modifies ton code