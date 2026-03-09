from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import date, timedelta
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.client import Client
from app.models.hebergement import Hebergement
from app.models.paiement import Paiement
from app.models.service import Relance, Certificat
from app.schemas.schemas import DashboardStats

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


@router.get("/stats", response_model=DashboardStats)
async def get_stats(
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    today = date.today()
    in_30_days = today + timedelta(days=30)

    total_clients = (await db.execute(select(func.count(Client.id)))).scalar()
    total_hebs = (await db.execute(select(func.count(Hebergement.id)))).scalar()
    actifs = (await db.execute(
        select(func.count(Hebergement.id)).where(Hebergement.statut == "actif")
    )).scalar()
    expires = (await db.execute(
        select(func.count(Hebergement.id)).where(Hebergement.statut == "expiré")
    )).scalar()
    total_paiements = (await db.execute(
        select(func.coalesce(func.sum(Paiement.montant), 0))
        .where(Paiement.statut_paiement == "payé")
    )).scalar()
    en_attente = (await db.execute(
        select(func.count(Paiement.id)).where(Paiement.statut_paiement == "en_attente")
    )).scalar()
    relances_recentes = (await db.execute(
        select(func.count(Relance.id)).where(Relance.date_relance >= today - timedelta(days=7))
    )).scalar()
    certs_bientot = (await db.execute(
        select(func.count(Certificat.id))
        .where(Certificat.date_expiration <= in_30_days)
        .where(Certificat.statut == "valide")
    )).scalar()

    return DashboardStats(
        total_clients=total_clients,
        total_hebergements=total_hebs,
        hebergements_actifs=actifs,
        hebergements_expires=expires,
        total_paiements=float(total_paiements),
        paiements_en_attente=en_attente,
        relances_recentes=relances_recentes,
        certificats_expires_bientot=certs_bientot,
    )
