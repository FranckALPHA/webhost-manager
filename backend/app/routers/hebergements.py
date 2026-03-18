from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List
from datetime import date, timedelta
from app.core.database import get_db
from app.core.security import get_current_user, get_current_admin
from app.models.user import User
from app.models.hebergement import Hebergement
from app.models.client import Client
from app.schemas.hebergement import (
    HebergementCreate, HebergementOut, HebergementUpdate, HebergementWithClient
)

router = APIRouter(prefix="/api/hebergements", tags=["Hébergements"])


@router.get("/", response_model=List[HebergementWithClient])
async def list_hebergements(
    statut: str = None,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    query = select(Hebergement).options(selectinload(Hebergement.client))
    if statut:
        query = query.where(Hebergement.statut == statut)
    result = await db.execute(query.order_by(Hebergement.date_expiration))
    return result.scalars().all()


@router.get("/expires-soon", response_model=List[HebergementWithClient])
async def get_expiring_soon(
    days: int = 30,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """Hébergements expirant dans les N prochains jours."""
    today = date.today()
    limit = today + timedelta(days=days)
    result = await db.execute(
        select(Hebergement)
        .options(selectinload(Hebergement.client))
        .where(Hebergement.date_expiration <= limit)
        .where(Hebergement.date_expiration >= today)
        .where(Hebergement.statut == "actif")
        .order_by(Hebergement.date_expiration)
    )
    return result.scalars().all()


@router.get("/{heb_id}", response_model=HebergementWithClient)
async def get_hebergement(
    heb_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Hebergement)
        .options(selectinload(Hebergement.client))
        .where(Hebergement.id == heb_id)
    )
    h = result.scalar_one_or_none()
    if not h:
        raise HTTPException(status_code=404, detail="Hébergement introuvable")
    return h


@router.post("/", response_model=HebergementOut, status_code=201)
async def create_hebergement(
    data: HebergementCreate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    # Vérifier que le client existe
    client_res = await db.execute(select(Client).where(Client.id == data.client_id))
    if not client_res.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Client introuvable")
    # Vérifier unicité du domaine
    domain_res = await db.execute(
        select(Hebergement).where(Hebergement.nom_domaine == data.nom_domaine)
    )
    if domain_res.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Ce nom de domaine est déjà enregistré")

    h = Hebergement(**data.model_dump())
    db.add(h)
    await db.flush()
    await db.refresh(h)
    return h


@router.put("/{heb_id}", response_model=HebergementOut)
async def update_hebergement(
    heb_id: int,
    data: HebergementUpdate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    result = await db.execute(select(Hebergement).where(Hebergement.id == heb_id))
    h = result.scalar_one_or_none()
    if not h:
        raise HTTPException(status_code=404, detail="Hébergement introuvable")
    for field, value in data.model_dump(exclude_none=True).items():
        setattr(h, field, value)
    await db.flush()
    await db.refresh(h)
    return h


@router.post("/{heb_id}/renouveler", response_model=HebergementOut)
async def renouveler_hebergement(
    heb_id: int,
    mois: int = 12,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """Renouvelle l'hébergement de N mois à partir de la date d'expiration actuelle."""
    result = await db.execute(select(Hebergement).where(Hebergement.id == heb_id))
    h = result.scalar_one_or_none()
    if not h:
        raise HTTPException(status_code=404, detail="Hébergement introuvable")

    base = max(h.date_expiration, date.today())
    # Calcul simple : ajouter N mois
    new_month = base.month + mois
    new_year = base.year + new_month // 12
    new_month = new_month % 12 or 12
    try:
        from datetime import date as dt
        new_exp = dt(new_year, new_month, base.day)
    except ValueError:
        import calendar
        last_day = calendar.monthrange(new_year, new_month)[1]
        new_exp = dt(new_year, new_month, last_day)

    h.date_expiration = new_exp
    h.statut = "actif"
    await db.flush()
    await db.refresh(h)
    return h


@router.delete("/{heb_id}", status_code=204)
async def delete_hebergement(
    heb_id: int,
    db: AsyncSession = Depends(get_db),
    # UC : supprimer hébergement → réservé admin (symétrique à supprimer utilisateur)
    _: User = Depends(get_current_admin),
):
    """
    Supprime un hébergement.
    ⚠️ Réservé admin — UC : supprimer hebergement
    """
    result = await db.execute(select(Hebergement).where(Hebergement.id == heb_id))
    h = result.scalar_one_or_none()
    if not h:
        raise HTTPException(status_code=404, detail="Hébergement introuvable")
    await db.delete(h)
