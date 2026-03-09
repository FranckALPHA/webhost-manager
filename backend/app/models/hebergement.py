from sqlalchemy import Column, Integer, String, Date, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base


class Hebergement(Base):
    __tablename__ = "hebergements"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    nom_domaine = Column(String(150), unique=True, nullable=False, index=True)
    type_hebergement = Column(String(50), nullable=False)  # shared | vps | dédié
    date_debut = Column(Date, nullable=False)
    date_expiration = Column(Date, nullable=False)
    statut = Column(String(30), default="actif")  # actif | expiré | suspendu
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    client = relationship("Client", back_populates="hebergements")
    paiements = relationship("Paiement", back_populates="hebergement")
    relances = relationship("Relance", back_populates="hebergement", cascade="all, delete-orphan")
    certificat = relationship("Certificat", back_populates="hebergement", uselist=False, cascade="all, delete-orphan")
    vm = relationship("VirtualMachine", back_populates="hebergement", uselist=False, cascade="all, delete-orphan")
