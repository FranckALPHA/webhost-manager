from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import date, datetime
from client import ClientOut
import re

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