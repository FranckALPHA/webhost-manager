from sqlalchemy.ext.asyncio import AsyncSession
from app.models.service import AuditLog
import json

async def log_action(
    db: AsyncSession,
    user_id: int,
    action: str,
    resource: str,
    resource_id: int = None,
    details: dict = None
):
    log = AuditLog(
        user_id=user_id,
        action=action,
        resource=resource,
        resource_id=resource_id,
        details=json.dumps(details) if details else None
    )
    db.add(log)
    await db.flush()
