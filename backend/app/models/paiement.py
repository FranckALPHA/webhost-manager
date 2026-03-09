from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base


class Paiement(Base):
    __tablename__ = "paiements"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    hebergement_id = Column(Integer, ForeignKey("hebergements.id"), nullable=True)
    montant = Column(Float, nullable=False)
    date_paiement = Column(Date, nullable=False)
    mode_paiement = Column(String(50), nullable=False)  # carte | virement | mobile_money
    statut_paiement = Column(String(30), default="en_attente")  # payé | en_attente | annulé
    reference = Column(String(100), unique=True, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    client = relationship("Client", back_populates="paiements")
    hebergement = relationship("Hebergement", back_populates="paiements")
