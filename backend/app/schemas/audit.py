from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class AuditLogOut(BaseModel):
    id: int
    user_id: int
    action: str
    resource: str
    resource_id: Optional[int]
    details: Optional[str]
    created_at: datetime
    model_config = {"from_attributes": True}
