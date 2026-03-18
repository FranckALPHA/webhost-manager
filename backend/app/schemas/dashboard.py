from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_clients: int
    total_hebergements: int
    hebergements_actifs: int
    hebergements_expires: int
    total_paiements: float
    paiements_en_attente: int
    relances_recentes: int
    certificats_expires_bientot: int
