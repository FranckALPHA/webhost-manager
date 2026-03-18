from pydantic import BaseModel
from typing import Optional

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