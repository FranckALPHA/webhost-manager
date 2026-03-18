from pydantic import BaseModel
from typing import Optional
from datetime import datetime

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
