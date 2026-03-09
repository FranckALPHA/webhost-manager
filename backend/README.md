# 🌐 WebHostManager — Backend FastAPI

Backend d'un prototype de service cloud d'hébergement web, développé avec **FastAPI + SQLite**.

---

## 🗂️ Structure du projet

```
webhostmanager/
├── main.py                   ← Point d'entrée de l'application
├── seed.py                   ← Peuplement avec données de démo
├── requirements.txt
└── app/
    ├── core/
    │   ├── config.py         ← Paramètres (SECRET_KEY, DB URL…)
    │   ├── database.py       ← Engine SQLAlchemy async + session
    │   └── security.py       ← JWT, hashage, dépendances auth
    ├── models/
    │   ├── user.py           ← Modèle Utilisateur
    │   ├── client.py         ← Modèle Client
    │   ├── hebergement.py    ← Modèle Hébergement
    │   ├── paiement.py       ← Modèle Paiement
    │   └── service.py        ← Service, Relance, Certificat, VirtualMachine
    ├── schemas/
    │   └── schemas.py        ← Tous les schémas Pydantic (In/Out)
    └── routers/
        ├── auth.py           ← /api/auth/*
        ├── users.py          ← /api/users/*  (admin)
        ├── clients.py        ← /api/clients/*
        ├── hebergements.py   ← /api/hebergements/*
        ├── paiements.py      ← /api/paiements/*
        ├── dashboard.py      ← /api/dashboard/stats
        └── extras.py         ← /api/services, /api/relances, /api/certificats, /api/vms
```

---

## 🚀 Installation & Démarrage

### 1. Prérequis
- Python 3.11+

### 2. Environnement virtuel
```bash
python -m venv venv
source venv/bin/activate        # Linux/Mac
venv\Scripts\activate           # Windows
```

### 3. Installer les dépendances
```bash
pip install -r requirements.txt
```

### 4. Peupler la base avec des données de démo
```bash
python seed.py
```

Comptes créés :
| Rôle | Username | Password |
|------|----------|----------|
| Admin | `admin` | `Admin1234!` |
| Agent | `agent1` | `Agent1234!` |

### 5. Lancer le serveur
```bash
uvicorn main:app --reload
```

API disponible sur : **http://localhost:8000**
Documentation Swagger : **http://localhost:8000/docs**
Documentation ReDoc : **http://localhost:8000/redoc**

---

## 📡 Endpoints principaux

### 🔐 Auth
| Méthode | URL | Description |
|---------|-----|-------------|
| POST | `/api/auth/register` | Créer un compte |
| POST | `/api/auth/login` | Connexion → JWT |
| GET  | `/api/auth/me` | Profil connecté |

### 👥 Clients
| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/clients/` | Liste des clients |
| POST | `/api/clients/` | Créer un client |
| PUT | `/api/clients/{id}` | Modifier |
| DELETE | `/api/clients/{id}` | Supprimer |

### 🌍 Hébergements
| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/hebergements/` | Liste (filtre par statut) |
| GET | `/api/hebergements/expires-soon?days=30` | Expirant bientôt |
| POST | `/api/hebergements/` | Créer |
| POST | `/api/hebergements/{id}/renouveler?mois=12` | Renouveler |
| PUT | `/api/hebergements/{id}` | Modifier |
| DELETE | `/api/hebergements/{id}` | Supprimer |

### 💳 Paiements
| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/paiements/` | Liste (filtre client/statut) |
| GET | `/api/paiements/historique/{client_id}` | Historique client |
| POST | `/api/paiements/` | Enregistrer un paiement |
| PUT | `/api/paiements/{id}` | Modifier statut |

### 🖥️ Machines Virtuelles (Simulation)
| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/vms/` | Liste des VMs |
| POST | `/api/vms/` | Provisionner une VM |
| POST | `/api/vms/{id}/action` | start / stop / restart / suspend |
| DELETE | `/api/vms/{id}` | Détruire |

### 📊 Dashboard
| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/dashboard/stats` | Statistiques globales |

---

## 🖥️ Simulation des Machines Virtuelles

Le module VM simule un cycle de vie complet :

```
arrêtée ──[start]──► running ──[stop]────► arrêtée
                        │
                   [suspend]
                        ▼
                   suspendue ──[start]──► running
```

Chaque VM créée reçoit automatiquement une IP privée simulée (192.168.x.x).

---

## 🔒 Variables d'environnement (.env)

```env
SECRET_KEY=changez-moi-en-production
DATABASE_URL=sqlite+aiosqlite:///./webhostmanager.db
ACCESS_TOKEN_EXPIRE_MINUTES=1440
DEBUG=False
```

---

## 📐 Diagramme de base de données

```
users ─────────────────────────────────────────────────────
clients ──┬── hebergements ──┬── relances
          │                  ├── certificats
          └── paiements      ├── virtual_machines
                             └── paiements (ref)
services (catalogue indépendant)
```
