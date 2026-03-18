from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


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
