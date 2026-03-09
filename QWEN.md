# WebHostManager — Full-Stack Project

## Project Overview

**WebHostManager** is a full-stack web application for managing a cloud web hosting service. It provides a complete backend API built with **FastAPI + SQLite** and a modern admin dashboard frontend built with **React + TypeScript + Vite**.

The application enables administrators to manage clients, hosting subscriptions, payments, virtual machines (simulated), SSL certificates, payment reminders, and view dashboard statistics.

---

## Architecture

```
jordan/
├── backend/          # FastAPI REST API
│   ├── main.py       # Application entry point
│   ├── seed.py       # Database seeder
│   ├── requirements.txt
│   └── app/
│       ├── core/     # Config, database, security
│       ├── models/   # SQLAlchemy models
│       ├── schemas/  # Pydantic schemas
│       ├── routers/  # API route handlers
│       └── services/ # Business logic
│
└── frontend/         # React admin dashboard
    ├── src/
    │   ├── components/  # UI components (shadcn/ui)
    │   ├── pages/       # Route pages
    │   ├── hooks/       # Custom hooks
    │   ├── lib/         # Utilities
    │   └── mock/        # Mock data for dev
    ├── maquette/     # Design mockups (SVG)
    └── [config files]
```

---

## Backend (FastAPI)

### Technology Stack

| Component | Technology |
|-----------|------------|
| Framework | FastAPI 0.111 |
| Database | SQLite + SQLAlchemy 2.0 (async) |
| Authentication | JWT (python-jose) |
| Password Hashing | passlib + bcrypt |
| Validation | Pydantic 2.7 |
| Server | Uvicorn |

### Backend Structure

```
app/
├── core/
│   ├── config.py       # App settings (SECRET_KEY, DB URL)
│   ├── database.py     # SQLAlchemy async engine
│   └── security.py     # JWT, password hashing, auth dependencies
├── models/
│   ├── user.py         # User model (admin/agent)
│   ├── client.py       # Client model
│   ├── hebergement.py  # Hosting subscription model
│   ├── paiement.py     # Payment model
│   ├── relance.py      # Payment reminder model
│   ├── certificat.py   # SSL certificate model
│   └── service.py      # Service catalog + VM model
├── schemas/
│   └── schemas.py      # Pydantic In/Out schemas
└── routers/
    ├── auth.py         # /api/auth/* (login, register, me)
    ├── users.py        # /api/users/* (admin user management)
    ├── clients.py      # /api/clients/* (CRUD)
    ├── hebergements.py # /api/hebergements/* (CRUD + renewal)
    ├── paiements.py    # /api/paiements/* (CRUD + history)
    ├── dashboard.py    # /api/dashboard/stats
    └── extras.py       # /api/services, relances, certificats, vms
```

### API Endpoints

| Module | Endpoints | Description |
|--------|-----------|-------------|
| **Auth** | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` | JWT authentication |
| **Users** | `GET/POST/PUT/DELETE /api/users/*` | Admin user management |
| **Clients** | `GET/POST/PUT/DELETE /api/clients/*` | Client CRUD |
| **Hébergements** | `GET/POST/PUT/DELETE /api/hebergements/*`, `POST /api/hebergements/{id}/renouveler` | Hosting management + renewal |
| **Paiements** | `GET/POST/PUT /api/paiements/*`, `GET /api/paiements/historique/{client_id}` | Payment tracking |
| **VMs** | `GET/POST/DELETE /api/vms/*`, `POST /api/vms/{id}/action` | VM lifecycle simulation |
| **Dashboard** | `GET /api/dashboard/stats` | Global statistics |

### Default Accounts (after seeding)

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `Admin1234!` |
| Agent | `agent1` | `Agent1234!` |

---

## Frontend (React)

### Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React 18.3+ with TypeScript |
| Build Tool | Vite 5.4+ |
| Routing | React Router DOM 6.30+ |
| UI Components | shadcn/ui (Radix UI) |
| Styling | Tailwind CSS 3.4+ |
| State Management | TanStack React Query 5.83+ |
| Forms | React Hook Form 7.61+ + Zod |
| Charts | Recharts 2.15+ |
| Testing | Vitest + React Testing Library |

### Frontend Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/` | Authentication |
| Dashboard | `/dashboard` | Overview with statistics |
| Clients | `/clients` | Client management |
| Hébergements | `/hebergements` | Hosting subscription management |
| Paiements | `/paiements` | Payment tracking |
| Relances | `/relances` | Payment reminders |
| Utilisateurs | `/utilisateurs` | User administration |
| Notifications | `/notifications` | Notification center |

---

## Building and Running

### Prerequisites

- **Backend**: Python 3.11+
- **Frontend**: Node.js 18+ (npm or Bun)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Linux/Mac
# or: venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Seed database with demo data
python seed.py

# Start the API server
uvicorn main:app --reload
```

**API available at**: `http://localhost:8000`  
**Swagger docs**: `http://localhost:8000/docs`  
**ReDoc docs**: `http://localhost:8000/redoc`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
# or with Bun: bun install

# Start development server
npm run dev
```

**Frontend available at**: `http://localhost:8080`

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 8080, HMR enabled) |
| `npm run build` | Build for production |
| `npm run build:dev` | Build for development mode |
| `npm run test` | Run tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint code with ESLint |
| `npm run preview` | Preview production build |

---

## Configuration

### Backend Environment Variables (`.env`)

```env
SECRET_KEY=change-me-in-production
DATABASE_URL=sqlite+aiosqlite:///./webhostmanager.db
ACCESS_TOKEN_EXPIRE_MINUTES=1440
DEBUG=False
```

### Frontend Configuration

- **Vite**: Configured in `vite.config.ts` (port 8080, HMR overlay disabled)
- **Path Alias**: `@/` resolves to `src/`
- **CORS**: Backend allows all origins (should be restricted in production)

---

## Development Conventions

### Backend

- **Async/Await**: All database operations use SQLAlchemy async
- **Dependency Injection**: FastAPI dependencies for authentication
- **Schema Validation**: Pydantic v2 for request/response validation

### Frontend

- **TypeScript**: Relaxed strict mode for flexibility
- **Component Naming**: PascalCase for components
- **Path Imports**: Use `@/` alias for `src/` directory
- **UI Components**: shadcn/ui pattern with `cn()` utility

### Testing

- **Backend**: Use `httpx` for API testing (included in dependencies)
- **Frontend**: Vitest with jsdom, React Testing Library

---

## Database Schema

```
users ─────────────────────────────────────────────────────
clients ──┬── hebergements ──┬── relances
          │                  ├── certificats
          └── paiements      ├── virtual_machines
                             └── paiements (ref)
services (catalogue indépendant)
```

---

## VM Lifecycle Simulation

The backend simulates virtual machine lifecycle:

```
arrêtée ──[start]──► running ──[stop]────► arrêtée
                        │
                   [suspend]
                        ▼
                   suspendue ──[start]──► running
```

Each VM receives a simulated private IP (192.168.x.x).

---

## Related Documentation

- [Backend README](./backend/README.md) — Detailed backend documentation
- [Frontend QWEN.md](./frontend/QWEN.md) — Detailed frontend documentation
