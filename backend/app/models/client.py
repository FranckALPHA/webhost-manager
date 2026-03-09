from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base


class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    nom_client = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    telephone = Column(String(20))
    adresse = Column(String(255))
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    hebergements = relationship("Hebergement", back_populates="client", cascade="all, delete-orphan")
    paiements = relationship("Paiement", back_populates="client", cascade="all, delete-orphan")
