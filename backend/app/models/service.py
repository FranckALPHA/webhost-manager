from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String(100), nullable=False)
    description = Column(Text)
    prix = Column(Float, nullable=False)
    type_service = Column(String(50))  # shared | vps | dédié | email | ssl
    is_active = Column(Integer, default=1)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class Relance(Base):
    __tablename__ = "relances"

    id = Column(Integer, primary_key=True, index=True)
    hebergement_id = Column(Integer, ForeignKey("hebergements.id"), nullable=False)
    date_relance = Column(Date, nullable=False)
    type_relance = Column(String(50))  # email | sms | notification
    statut_relance = Column(String(30), default="envoyé")  # envoyé | lu | ignoré
    message = Column(Text)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    hebergement = relationship("Hebergement", back_populates="relances")


class Certificat(Base):
    __tablename__ = "certificats"

    id = Column(Integer, primary_key=True, index=True)
    hebergement_id = Column(Integer, ForeignKey("hebergements.id"), nullable=False, unique=True)
    nom_domaine = Column(String(150), nullable=False)
    date_expiration = Column(Date, nullable=False)
    statut = Column(String(30), default="valide")  # valide | expiré | révoqué
    autorite = Column(String(100), default="Let's Encrypt")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    hebergement = relationship("Hebergement", back_populates="certificat")


class VirtualMachine(Base):
    __tablename__ = "virtual_machines"

    id = Column(Integer, primary_key=True, index=True)
    hebergement_id = Column(Integer, ForeignKey("hebergements.id"), nullable=False, unique=True)
    vm_name = Column(String(100), nullable=False)
    os = Column(String(50), default="Ubuntu 22.04")
    cpu_cores = Column(Integer, default=1)
    ram_mb = Column(Integer, default=512)
    disk_gb = Column(Integer, default=10)
    ip_address = Column(String(45))
    statut = Column(String(30), default="arrêtée")  # running | arrêtée | suspendue
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    hebergement = relationship("Hebergement", back_populates="vm")
