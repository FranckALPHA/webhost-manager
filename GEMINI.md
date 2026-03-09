# 🌐 WebHostManager — Project Context

## Project Overview

**WebHostManager** (also known as **Domain Dreamland**) is a full-stack cloud hosting and residential rental management dashboard. It features a robust backend for managing business logic and a modern, interactive frontend for administration.

- **Purpose**: Manage clients, hosting subscriptions, payments, virtual machine simulations, SSL certificates, and automated payment reminders.
- **Architecture**: Monorepo with a decoupled FastAPI backend and a React (Vite) frontend.

---

## 🛠️ Technology Stack

### Backend (Python)
- **Framework**: FastAPI 0.111.0
- **Database**: SQLite with SQLAlchemy 2.0 (Asynchronous via `aiosqlite`)
- **Authentication**: JWT (`python-jose`) + Password hashing (`passlib[bcrypt]`)
- **Validation**: Pydantic v2
- **Documentation**: Swagger UI (`/docs`) and ReDoc (`/redoc`)

### Frontend (TypeScript/React)
- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 5.4
- **State Management**: TanStack React Query 5.83
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS 3.4
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts 2.15
- **Testing**: Vitest 3.2 + React Testing Library

---

## 🚀 Building and Running

### Prerequisites
- Python 3.11+
- Node.js 18+ (npm or Bun)

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or: venv\Scripts\activate  # Windows

pip install -r requirements.txt
python seed.py  # Seed the DB with demo data
uvicorn main:app --reload --port 9990
```
- **Port**: `9990`
- **Default Admin**: `admin` / `Admin1234!`
- **Default Agent**: `agent1` / `Admin1234!`

### Frontend Setup
```bash
cd frontend
npm install  # or bun install
npm run dev
```
- **Port**: `8080` (HMR enabled)
- **URL**: `http://localhost:8080`

### Key Commands
| Context | Command | Description |
|---------|---------|-------------|
| Backend | `uvicorn main:app --reload --port 9990` | Start development server |
| Backend | `python seed.py` | Reset/Seed database |
| Frontend | `npm run dev` | Start Vite dev server |
| Frontend | `npm run build` | Build for production |
| Frontend | `npm run test` | Run frontend tests |
| Frontend | `npm run lint` | Run ESLint |

---

## 📂 Project Structure

### Backend (`/backend`)
- `app/core/`: Security, Database, and Global Configuration.
- `app/models/`: SQLAlchemy models (Database schema).
- `app/schemas/`: Pydantic models (Data validation).
- `app/routers/`: API endpoints (Auth, Clients, Payments, etc.).
- `app/services/`: Business logic.
- `seed.py`: Database initialization script.
- `main.py`: FastAPI entry point.

### Frontend (`/frontend`)
- `src/components/`: Reusable UI components (including `shadcn/ui` in `ui/`).
- `src/pages/`: Main application routes (Dashboard, Clients, etc.).
- `src/mock/`: TypeScript mock data for offline development.
- `src/hooks/`: Custom React hooks.
- `src/lib/`: Utilities (`cn` helper).
- `maquette/`: SVG design mockups.

---

## 📐 Development Conventions

### Backend Guidelines
- **Async First**: Use `async/await` for all DB operations and route handlers.
- **Dependency Injection**: Utilize FastAPI's `Depends` for authentication and DB sessions.
- **Surgical Schemas**: Strictly use Pydantic schemas for Request/Response validation.

### Frontend Guidelines
- **Strict Typing**: Leverage TypeScript for all components and utilities.
- **Path Aliases**: Use `@/` to import from the `src/` directory.
- **Component Pattern**: Use functional components with Tailwind CSS classes managed via the `cn()` utility.
- **Testing**: Write unit tests in `src/**/*.{test,spec}.tsx` using Vitest.

---

## 🔐 Configuration

### Backend Environment (`.env`)
- `SECRET_KEY`: Used for JWT signing.
- `DATABASE_URL`: Defaults to `sqlite+aiosqlite:///./webhostmanager.db`.
- `ACCESS_TOKEN_EXPIRE_MINUTES`: JWT TTL.

### Frontend Config
- Managed via `vite.config.ts`, `tailwind.config.ts`, and `tsconfig.json`.
- Port is locked to `8080` in `vite.config.ts`.
