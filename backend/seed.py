"""
Script de peuplement de la base de données avec des données de démonstration.
Usage : python seed.py
"""
import asyncio
from datetime import date, timedelta
from app.core.database import init_db, AsyncSessionLocal
from app.core.security import hash_password
from app.models.user import User
from app.models.client import Client
from app.models.hebergement import Hebergement
from app.models.paiement import Paiement
from app.models.service import Service, Relance, Certificat, VirtualMachine


async def seed():
    await init_db()
    async with AsyncSessionLocal() as db:
        # ── Utilisateurs ──────────────────────────────────────────────────
        admin = User(
            username="admin",
            email="admin@webhostmanager.cm",
            hashed_password=hash_password("Admin1234!"),
            role="admin",
        )
        agent = User(
            username="agent1",
            email="agent1@webhostmanager.cm",
            hashed_password=hash_password("Agent1234!"),
            role="utilisateur",
        )
        db.add_all([admin, agent])
        await db.flush()

        # ── Services catalogue ────────────────────────────────────────────
        services = [
            Service(nom="Hébergement Shared", description="Mutualisé 5 Go", prix=5000, type_service="shared"),
            Service(nom="VPS Standard", description="2 vCPU, 2 Go RAM, 40 Go SSD", prix=15000, type_service="vps"),
            Service(nom="Serveur Dédié", description="8 vCPU, 16 Go RAM, 500 Go", prix=60000, type_service="dédié"),
            Service(nom="Certificat SSL", description="Let's Encrypt wildcard", prix=0, type_service="ssl"),
            Service(nom="Email Pro", description="Boîtes mail @votredomaine.cm", prix=3000, type_service="email"),
        ]
        db.add_all(services)
        await db.flush()

        # ── Clients ───────────────────────────────────────────────────────
        clients = [
            Client(nom_client="Entreprise ACME Sarl", email="contact@acme.cm", telephone="+237 699 000 001", adresse="Yaoundé, Cameroun"),
            Client(nom_client="Jean-Paul Mbarga", email="jp.mbarga@gmail.com", telephone="+237 677 000 002", adresse="Douala, Cameroun"),
            Client(nom_client="StartupTech CI", email="hello@startuptech.ci", telephone="+225 07 00 00 003", adresse="Abidjan, Côte d'Ivoire"),
            Client(nom_client="Ministère du Numérique", email="dsi@numerique.gov.cm", telephone="+237 222 000 004", adresse="Yaoundé, Cameroun"),
        ]
        db.add_all(clients)
        await db.flush()

        today = date.today()

        # ── Hébergements ──────────────────────────────────────────────────
        hebergements = [
            Hebergement(client_id=clients[0].id, nom_domaine="acme-sarl.cm", type_hebergement="vps",
                        date_debut=today - timedelta(days=180), date_expiration=today + timedelta(days=185), statut="actif"),
            Hebergement(client_id=clients[1].id, nom_domaine="jeanpaulmbarga.cm", type_hebergement="shared",
                        date_debut=today - timedelta(days=365), date_expiration=today + timedelta(days=20), statut="actif"),
            Hebergement(client_id=clients[2].id, nom_domaine="startuptech.ci", type_hebergement="dédié",
                        date_debut=today - timedelta(days=90), date_expiration=today + timedelta(days=275), statut="actif"),
            Hebergement(client_id=clients[3].id, nom_domaine="numerique.gov.cm", type_hebergement="dédié",
                        date_debut=today - timedelta(days=400), date_expiration=today - timedelta(days=35), statut="expiré"),
        ]
        db.add_all(hebergements)
        await db.flush()

        # ── Paiements ─────────────────────────────────────────────────────
        paiements = [
            Paiement(client_id=clients[0].id, hebergement_id=hebergements[0].id, montant=15000,
                     date_paiement=today - timedelta(days=180), mode_paiement="virement", statut_paiement="payé", reference="PAY-ACM001"),
            Paiement(client_id=clients[1].id, hebergement_id=hebergements[1].id, montant=5000,
                     date_paiement=today - timedelta(days=365), mode_paiement="mobile_money", statut_paiement="payé", reference="PAY-JPM002"),
            Paiement(client_id=clients[1].id, hebergement_id=hebergements[1].id, montant=5000,
                     date_paiement=today - timedelta(days=5), mode_paiement="mobile_money", statut_paiement="en_attente", reference="PAY-JPM003"),
            Paiement(client_id=clients[2].id, hebergement_id=hebergements[2].id, montant=60000,
                     date_paiement=today - timedelta(days=90), mode_paiement="carte", statut_paiement="payé", reference="PAY-STC004"),
        ]
        db.add_all(paiements)
        await db.flush()

        # ── Relances ──────────────────────────────────────────────────────
        relances = [
            Relance(hebergement_id=hebergements[1].id, date_relance=today - timedelta(days=3),
                    type_relance="email", statut_relance="envoyé",
                    message="Votre hébergement 'jeanpaulmbarga.cm' expire dans 23 jours."),
        ]
        db.add_all(relances)
        await db.flush()

        # ── Certificats SSL ───────────────────────────────────────────────
        certificats = [
            Certificat(hebergement_id=hebergements[0].id, nom_domaine="acme-sarl.cm",
                       date_expiration=today + timedelta(days=85), statut="valide"),
            Certificat(hebergement_id=hebergements[1].id, nom_domaine="jeanpaulmbarga.cm",
                       date_expiration=today + timedelta(days=20), statut="valide"),
            Certificat(hebergement_id=hebergements[2].id, nom_domaine="startuptech.ci",
                       date_expiration=today + timedelta(days=270), statut="valide"),
        ]
        db.add_all(certificats)
        await db.flush()

        # ── Machines Virtuelles ───────────────────────────────────────────
        vms = [
            VirtualMachine(hebergement_id=hebergements[0].id, vm_name="vm-acme-vps",
                           os="Ubuntu 22.04", cpu_cores=2, ram_mb=2048, disk_gb=40,
                           ip_address="192.168.10.5", statut="running"),
            VirtualMachine(hebergement_id=hebergements[2].id, vm_name="vm-startuptech-dedicated",
                           os="Debian 12", cpu_cores=8, ram_mb=16384, disk_gb=500,
                           ip_address="192.168.10.20", statut="running"),
        ]
        db.add_all(vms)
        await db.commit()

    print("✅ Base de données peuplée avec succès !")
    print("   👤 Admin    → username: admin    / password: Admin1234!")
    print("   👤 Agent    → username: agent1   / password: Agent1234!")


if __name__ == "__main__":
    asyncio.run(seed())
