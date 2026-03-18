from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.user import User
from app.models.service import AuditLog
from app.schemas.audit import AuditLogOut

router = APIRouter(prefix="/api/logs", tags=["Audit Logs"])

@router.get("/", response_model=List[AuditLogOut])
async def list_logs(
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    result = await db.execute(select(AuditLog).order_by(AuditLog.created_at.desc()).limit(100))
    return result.scalars().all()
