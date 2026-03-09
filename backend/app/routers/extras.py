from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from datetime import date, timedelta
import random, ipaddress

from app.core.database import get_db
from app.core.security import get_current_user, get_current_admin
from app.models.user import User
from app.models.service import Service, Relance, Certificat, VirtualMachine
from app.models.hebergement import Hebergement
from app.schemas.schemas import (
    ServiceCreate, ServiceOut, ServiceUpdate,
    RelanceCreate, RelanceOut,
    CertificatCreate, CertificatOut,
    VMCreate, VMOut, VMAction,
)

# ─── SERVICES ────────────────────────────────────────────────────────────────

services_router = APIRouter(prefix="/api/services", tags=["Services"])


@services_router.get("/", response_model=List[ServiceOut])
async def list_services(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service).where(Service.is_active == 1))
    return result.scalars().all()


@services_router.post("/", response_model=ServiceOut, status_code=201)
async def create_service(
    data: ServiceCreate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    s = Service(**data.model_dump())
    db.add(s)
    await db.flush()
    await db.refresh(s)
    return s


@services_router.put("/{service_id}", response_model=ServiceOut)
async def update_service(
    service_id: int,
    data: ServiceUpdate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    result = await db.execute(select(Service).where(Service.id == service_id))
    s = result.scalar_one_or_none()
    if not s:
        raise HTTPException(404, "Service introuvable")
    for k, v in data.model_dump(exclude_none=True).items():
        setattr(s, k, v)
    await db.flush()
    await db.refresh(s)
    return s


# ─── RELANCES ────────────────────────────────────────────────────────────────

relances_router = APIRouter(prefix="/api/relances", tags=["Relances"])


@relances_router.get("/", response_model=List[RelanceOut])
async def list_relances(
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    result = await db.execute(select(Relance).order_by(Relance.date_relance.desc()))
    return result.scalars().all()


@relances_router.post("/", response_model=RelanceOut, status_code=201)
async def create_relance(
    data: RelanceCreate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    heb = await db.execute(select(Hebergement).where(Hebergement.id == data.hebergement_id))
    if not heb.scalar_one_or_none():
        raise HTTPException(404, "Hébergement introuvable")
    r = Relance(**data.model_dump())
    db.add(r)
    await db.flush()
    await db.refresh(r)
    return r


@relances_router.post("/auto-generate", response_model=List[RelanceOut])
async def auto_generate_relances(
    days: int = 30,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """Génère automatiquement des relances pour les hébergements expirant bientôt."""
    today = date.today()
    limit = today + timedelta(days=days)
    result = await db.execute(
        select(Hebergement)
        .where(Hebergement.date_expiration <= limit)
        .where(Hebergement.date_expiration >= today)
        .where(Hebergement.statut == "actif")
    )
    hebs = result.scalars().all()
    created = []
    for h in hebs:
        # Vérifier qu'une relance n'existe pas déjà pour ce mois
        existing = await db.execute(
            select(Relance)
            .where(Relance.hebergement_id == h.id)
            .where(Relance.date_relance >= today)
        )
        if not existing.scalar_one_or_none():
            jours_restants = (h.date_expiration - today).days
            r = Relance(
                hebergement_id=h.id,
                date_relance=today,
                type_relance="email",
                message=f"Votre hébergement '{h.nom_domaine}' expire dans {jours_restants} jours.",
                statut_relance="envoyé",
            )
            db.add(r)
            await db.flush()
            await db.refresh(r)
            created.append(r)
    return created


# ─── CERTIFICATS ─────────────────────────────────────────────────────────────

certificats_router = APIRouter(prefix="/api/certificats", tags=["Certificats SSL"])


@certificats_router.get("/", response_model=List[CertificatOut])
async def list_certificats(
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    result = await db.execute(select(Certificat))
    return result.scalars().all()


@certificats_router.post("/", response_model=CertificatOut, status_code=201)
async def create_certificat(
    data: CertificatCreate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    c = Certificat(**data.model_dump())
    db.add(c)
    await db.flush()
    await db.refresh(c)
    return c


# ─── VIRTUAL MACHINES ────────────────────────────────────────────────────────

vm_router = APIRouter(prefix="/api/vms", tags=["Machines Virtuelles (Simulation)"])


def _generate_ip() -> str:
    """Génère une IP privée simulée."""
    return f"192.168.{random.randint(1,254)}.{random.randint(2,254)}"


@vm_router.get("/", response_model=List[VMOut])
async def list_vms(
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    result = await db.execute(select(VirtualMachine))
    return result.scalars().all()


@vm_router.get("/{vm_id}", response_model=VMOut)
async def get_vm(
    vm_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    result = await db.execute(select(VirtualMachine).where(VirtualMachine.id == vm_id))
    vm = result.scalar_one_or_none()
    if not vm:
        raise HTTPException(404, "VM introuvable")
    return vm


@vm_router.post("/", response_model=VMOut, status_code=201)
async def create_vm(
    data: VMCreate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """Provisionne (simule) une nouvelle machine virtuelle."""
    heb = await db.execute(select(Hebergement).where(Hebergement.id == data.hebergement_id))
    if not heb.scalar_one_or_none():
        raise HTTPException(404, "Hébergement introuvable")
    existing = await db.execute(
        select(VirtualMachine).where(VirtualMachine.hebergement_id == data.hebergement_id)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(400, "Une VM existe déjà pour cet hébergement")

    vm = VirtualMachine(
        **data.model_dump(),
        ip_address=_generate_ip(),
        statut="arrêtée",
    )
    db.add(vm)
    await db.flush()
    await db.refresh(vm)
    return vm


@vm_router.post("/{vm_id}/action", response_model=VMOut)
async def vm_action(
    vm_id: int,
    payload: VMAction,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """
    Simule une action sur une VM.
    Actions: start | stop | restart | suspend
    """
    result = await db.execute(select(VirtualMachine).where(VirtualMachine.id == vm_id))
    vm = result.scalar_one_or_none()
    if not vm:
        raise HTTPException(404, "VM introuvable")

    transitions = {
        "start":   {"arrêtée": "running",  "suspendue": "running"},
        "stop":    {"running": "arrêtée",  "suspendue": "arrêtée"},
        "restart": {"running": "running"},
        "suspend": {"running": "suspendue"},
    }
    action = payload.action
    if action not in transitions:
        raise HTTPException(400, f"Action inconnue : {action}. Valides: start, stop, restart, suspend")

    allowed = transitions[action]
    if vm.statut not in allowed:
        raise HTTPException(400, f"Impossible de '{action}' une VM en statut '{vm.statut}'")

    vm.statut = allowed[vm.statut]
    await db.flush()
    await db.refresh(vm)
    return vm


@vm_router.delete("/{vm_id}", status_code=204)
async def delete_vm(
    vm_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    result = await db.execute(select(VirtualMachine).where(VirtualMachine.id == vm_id))
    vm = result.scalar_one_or_none()
    if not vm:
        raise HTTPException(404, "VM introuvable")
    await db.delete(vm)
