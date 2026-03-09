from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List, Optional
import uuid
from app.core.database import get_db
from app.core.security import get_current_user, get_current_admin
from app.models.user import User
from app.models.paiement import Paiement
from app.models.client import Client
from app.schemas.schemas import PaiementCreate, PaiementOut, PaiementUpdate

router = APIRouter(prefix="/api/paiements", tags=["Paiements"])


@router.get("/", response_model=List[PaiementOut])
async def list_paiements(
    client_id: Optional[int] = None,
    statut: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    # UC : Gerer paiement est accessible à tout Utilisateur authentifié
    _: User = Depends(get_current_user),
):
    query = select(Paiement)
    if client_id:
        query = query.where(Paiement.client_id == client_id)
    if statut:
        query = query.where(Paiement.statut_paiement == statut)
    result = await db.execute(query.order_by(Paiement.date_paiement.desc()))
    return result.scalars().all()


@router.get("/historique/{client_id}", response_model=List[PaiementOut])
async def historique_client(
    client_id: int,
    db: AsyncSession = Depends(get_db),
    # UC : "consulter historique" porte la condition [si admin]
    _: User = Depends(get_current_admin),
):
    """
    Historique complet des paiements d'un client.
    ⚠️ Réservé admin — UC : consulter historique [si admin]
    """
    result = await db.execute(
        select(Paiement)
        .where(Paiement.client_id == client_id)
        .order_by(Paiement.date_paiement.desc())
    )
    return result.scalars().all()


@router.post("/", response_model=PaiementOut, status_code=201)
async def create_paiement(
    data: PaiementCreate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    client_res = await db.execute(select(Client).where(Client.id == data.client_id))
    if not client_res.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Client introuvable")

    payload = data.model_dump()
    if not payload.get("reference"):
        payload["reference"] = f"PAY-{uuid.uuid4().hex[:10].upper()}"

    p = Paiement(**payload)
    db.add(p)
    await db.flush()
    await db.refresh(p)
    return p


@router.put("/{paiement_id}", response_model=PaiementOut)
async def update_paiement(
    paiement_id: int,
    data: PaiementUpdate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    result = await db.execute(select(Paiement).where(Paiement.id == paiement_id))
    p = result.scalar_one_or_none()
    if not p:
        raise HTTPException(status_code=404, detail="Paiement introuvable")
    for field, value in data.model_dump(exclude_none=True).items():
        setattr(p, field, value)
    await db.flush()
    await db.refresh(p)
    return p


@router.get("/{paiement_id}", response_model=PaiementOut)
async def get_paiement(
    paiement_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    result = await db.execute(select(Paiement).where(Paiement.id == paiement_id))
    p = result.scalar_one_or_none()
    if not p:
        raise HTTPException(status_code=404, detail="Paiement introuvable")
    return p
