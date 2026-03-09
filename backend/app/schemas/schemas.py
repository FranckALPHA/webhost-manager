from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, List
from datetime import date, datetime
import re


# ─── AUTH ────────────────────────────────────────────────────────────────────

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: Optional[str] = "utilisateur"

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    role: str
    is_active: bool
    created_at: datetime
    model_config = {"from_attributes": True}

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ─── CLIENT ──────────────────────────────────────────────────────────────────

class ClientCreate(BaseModel):
    nom_client: str
    email: EmailStr
    telephone: Optional[str] = None
    adresse: Optional[str] = None

class ClientUpdate(BaseModel):
    nom_client: Optional[str] = None
    email: Optional[EmailStr] = None
    telephone: Optional[str] = None
    adresse: Optional[str] = None

class ClientOut(BaseModel):
    id: int
    nom_client: str
    email: str
    telephone: Optional[str]
    adresse: Optional[str]
    created_at: datetime
    model_config = {"from_attributes": True}


# ─── HEBERGEMENT ─────────────────────────────────────────────────────────────

class HebergementCreate(BaseModel):
    client_id: int
    nom_domaine: str
    type_hebergement: str  # shared | vps | dédié
    date_debut: date
    date_expiration: date
    statut: Optional[str] = "actif"

    @field_validator("nom_domaine")
    @classmethod
    def validate_domaine(cls, v):
        if not re.match(r"^[a-zA-Z0-9][a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}$", v):
            raise ValueError("Nom de domaine invalide")
        return v.lower()

class HebergementUpdate(BaseModel):
    type_hebergement: Optional[str] = None
    date_expiration: Optional[date] = None
    statut: Optional[str] = None

class HebergementOut(BaseModel):
    id: int
    client_id: int
    nom_domaine: str
    type_hebergement: str
    date_debut: date
    date_expiration: date
    statut: str
    created_at: datetime
    model_config = {"from_attributes": True}

class HebergementWithClient(HebergementOut):
    client: ClientOut


# ─── PAIEMENT ────────────────────────────────────────────────────────────────

class PaiementCreate(BaseModel):
    client_id: int
    hebergement_id: Optional[int] = None
    montant: float
    date_paiement: date
    mode_paiement: str  # carte | virement | mobile_money
    statut_paiement: Optional[str] = "en_attente"
    reference: Optional[str] = None

class PaiementUpdate(BaseModel):
    montant: Optional[float] = None
    statut_paiement: Optional[str] = None
    mode_paiement: Optional[str] = None

class PaiementOut(BaseModel):
    id: int
    client_id: int
    hebergement_id: Optional[int]
    montant: float
    date_paiement: date
    mode_paiement: str
    statut_paiement: str
    reference: Optional[str]
    created_at: datetime
    model_config = {"from_attributes": True}


# ─── SERVICE ─────────────────────────────────────────────────────────────────

class ServiceCreate(BaseModel):
    nom: str
    description: Optional[str] = None
    prix: float
    type_service: Optional[str] = None

class ServiceUpdate(BaseModel):
    nom: Optional[str] = None
    description: Optional[str] = None
    prix: Optional[float] = None
    is_active: Optional[int] = None

class ServiceOut(BaseModel):
    id: int
    nom: str
    description: Optional[str]
    prix: float
    type_service: Optional[str]
    is_active: int
    model_config = {"from_attributes": True}


# ─── RELANCE ─────────────────────────────────────────────────────────────────

class RelanceCreate(BaseModel):
    hebergement_id: int
    date_relance: date
    type_relance: Optional[str] = "email"
    message: Optional[str] = None

class RelanceOut(BaseModel):
    id: int
    hebergement_id: int
    date_relance: date
    type_relance: Optional[str]
    statut_relance: str
    message: Optional[str]
    created_at: datetime
    model_config = {"from_attributes": True}


# ─── CERTIFICAT ──────────────────────────────────────────────────────────────

class CertificatCreate(BaseModel):
    hebergement_id: int
    nom_domaine: str
    date_expiration: date
    autorite: Optional[str] = "Let's Encrypt"

class CertificatOut(BaseModel):
    id: int
    hebergement_id: int
    nom_domaine: str
    date_expiration: date
    statut: str
    autorite: Optional[str]
    created_at: datetime
    model_config = {"from_attributes": True}


# ─── VM ──────────────────────────────────────────────────────────────────────

class VMCreate(BaseModel):
    hebergement_id: int
    vm_name: str
    os: Optional[str] = "Ubuntu 22.04"
    cpu_cores: Optional[int] = 1
    ram_mb: Optional[int] = 512
    disk_gb: Optional[int] = 10

class VMAction(BaseModel):
    action: str  # start | stop | restart | suspend

class VMOut(BaseModel):
    id: int
    hebergement_id: int
    vm_name: str
    os: str
    cpu_cores: int
    ram_mb: int
    disk_gb: int
    ip_address: Optional[str]
    statut: str
    created_at: datetime
    model_config = {"from_attributes": True}


# ─── DASHBOARD ───────────────────────────────────────────────────────────────

class DashboardStats(BaseModel):
    total_clients: int
    total_hebergements: int
    hebergements_actifs: int
    hebergements_expires: int
    total_paiements: float
    paiements_en_attente: int
    relances_recentes: int
    certificats_expires_bientot: int
