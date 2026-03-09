from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.database import init_db
from app.routers.auth import router as auth_router
from app.routers.users import router as users_router
from app.routers.clients import router as clients_router
from app.routers.hebergements import router as hebergements_router
from app.routers.paiements import router as paiements_router
from app.routers.dashboard import router as dashboard_router
from app.routers.extras import (
    services_router, relances_router, certificats_router, vm_router
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialise la base de données au démarrage."""
    await init_db()
    yield


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="""
## 🌐 WebHostManager API

Backend complet pour la gestion d'un service d'hébergement web.

### Fonctionnalités
- 🔐 **Authentification** JWT (admin / utilisateur)
- 👥 **Gestion clients** — CRUD complet
- 🌍 **Hébergements** — création, renouvellement, suivi expiration
- 💳 **Paiements** — enregistrement, historique, références automatiques
- 🔔 **Relances** — auto-génération avant expiration
- 🔒 **Certificats SSL** — suivi validité
- 🖥️ **Machines Virtuelles** — simulation provisioning (start/stop/suspend)
- 📊 **Dashboard** — statistiques globales

### Démarrage rapide
```bash
pip install -r requirements.txt
python seed.py          # Données de démo
uvicorn main:app --reload
```
    """,
    lifespan=lifespan,
)

# ── CORS — à restreindre en production ────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(clients_router)
app.include_router(hebergements_router)
app.include_router(paiements_router)
app.include_router(dashboard_router)
app.include_router(services_router)
app.include_router(relances_router)
app.include_router(certificats_router)
app.include_router(vm_router)


@app.get("/", tags=["Santé"])
async def root():
    return {
        "app": settings.APP_NAME,
        "version": settings.VERSION,
        "docs": "/docs",
        "redoc": "/redoc",
        "status": "✅ opérationnel",
    }


@app.get("/health", tags=["Santé"])
async def health():
    return {"status": "ok"}
