from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

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