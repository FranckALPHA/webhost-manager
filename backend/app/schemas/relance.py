from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


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
