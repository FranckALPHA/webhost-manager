from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

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

