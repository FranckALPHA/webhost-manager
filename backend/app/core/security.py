from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.config import settings
from app.core.database import get_db
from app.models.user import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


# ─── Dépendances d'authentification ──────────────────────────────────────────
#
# Modèle d'héritage du diagramme UC :
#
#        Utilisateur  ◄───────── (toutes les actions de base)
#             △
#             │  hérite
#           admin      ◄───────── (+ actions sensibles/destructives)
#
# Règles appliquées :
#   get_current_user  → tout utilisateur actif connecté (rôle: utilisateur OU admin)
#   get_current_admin → uniquement rôle admin
#
# Matrice complète :
#   Action                      | Utilisateur | Admin |
#   ----------------------------|-------------|-------|
#   s'authentifier              |     ✅      |  ✅   |
#   ajouter / modifier client   |     ✅      |  ✅   |
#   supprimer client            |     ✅      |  ✅   |
#   ajouter hébergement         |     ✅      |  ✅   |
#   modifier hébergement        |     ✅      |  ✅   |
#   renouveler hébergement      |     ✅      |  ✅   |
#   supprimer hébergement       |     ❌      |  ✅   |  ← UC : admin seulement
#   enregistrer paiement        |     ✅      |  ✅   |
#   modifier paiement           |     ✅      |  ✅   |
#   consulter historique        |     ❌      |  ✅   |  ← UC : [si admin]
#   gérer utilisateurs (CRUD)   |     ❌      |  ✅   |  ← UC : admin seulement
# ─────────────────────────────────────────────────────────────────────────────


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    """
    Dépendance de base : valide le JWT et retourne l'utilisateur actif.
    Accessible à tous les rôles (utilisateur ET admin) — conforme à l'héritage UC.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token invalide ou expiré",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    result = await db.execute(select(User).where(User.username == username))
    user = result.scalar_one_or_none()
    if user is None:
        raise credentials_exception
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Compte désactivé — contactez l'administrateur",
        )
    return user


async def get_current_admin(
    current_user: User = Depends(get_current_user),
) -> User:
    """
    Dépendance admin : hérite de get_current_user et vérifie le rôle.
    Utilisée pour toutes les actions réservées à l'admin dans le UC.
    L'admin hérite de toutes les capacités de l'Utilisateur (héritage UC).
    """
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Accès refusé — cette action est réservée aux administrateurs",
        )
    return current_user

