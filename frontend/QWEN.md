# Domain Dreamland - Project Context

## Project Overview

**Domain Dreamland** is a web-based administration dashboard for managing a hosting/residential rental business. The application provides tools for managing clients, accommodations (hébergements), payments, user notifications, and payment reminders (relances).

This project was generated using [Lovable](https://lovable.dev) and is built with modern React ecosystem tools.

## Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18.3+ with TypeScript |
| **Build Tool** | Vite 5.4+ |
| **Routing** | React Router DOM 6.30+ |
| **UI Components** | shadcn/ui (Radix UI primitives) |
| **Styling** | Tailwind CSS 3.4+ |
| **State Management** | TanStack React Query 5.83+ |
| **Forms** | React Hook Form 7.61+ with Zod validation |
| **Charts** | Recharts 2.15+ |
| **Testing** | Vitest 3.2+ with React Testing Library |
| **Linting** | ESLint 9.32+ |
| **Package Manager** | Bun (bun.lockb present) / npm |

## Project Structure

```
domain-dreamland/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ui/              # shadcn/ui component library
│   │   ├── AppBar.tsx       # Top application bar
│   │   ├── AppSidebar.tsx   # Navigation sidebar
│   │   ├── DashboardLayout.tsx  # Main layout wrapper
│   │   └── NavLink.tsx      # Navigation link component
│   ├── pages/               # Page components (route-level)
│   │   ├── Dashboard/       # Main dashboard with stats
│   │   ├── Clients/         # Client management
│   │   ├── Hebergements/    # Accommodation management
│   │   ├── Paiements/       # Payment tracking
│   │   ├── Relances/        # Payment reminders
│   │   ├── Utilisateurs/    # User management
│   │   ├── Notifications/   # Notification center
│   │   ├── Login/           # Authentication page
│   │   └── NotFound/        # 404 page
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   │   └── utils.ts         # cn() helper for classnames
│   ├── mock/                # Mock data for development
│   │   ├── clients.ts
│   │   ├── dashboard.ts
│   │   ├── hebergements.ts
│   │   ├── paiements.ts
│   │   ├── relances.ts
│   │   ├── utilisateurs.ts
│   │   └── notifications.ts
│   ├── test/                # Test utilities
│   │   └── setup.ts
│   ├── App.tsx              # Main application with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── maquette/                # Design mockups (SVG files)
├── public/                  # Static assets
└── [config files]           # TypeScript, Vite, Tailwind, ESLint
```

## Building and Running

### Prerequisites

- Node.js 18+ (install via [nvm](https://github.com/nvm-sh/nvm))
- npm or Bun package manager

### Commands

```bash
# Install dependencies
npm install

# Start development server (port 8080, HMR enabled)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Development Server Configuration

- **Host**: `::` (IPv6, accessible from network)
- **Port**: `8080`
- **HMR Overlay**: Disabled

## Key Features

### Authentication
- Login page with form validation
- Protected routes via `DashboardLayout`

### Dashboard Modules

| Module | Route | Description |
|--------|-------|-------------|
| Dashboard | `/dashboard` | Overview with stats, charts, recent payments |
| Clients | `/clients` | Client list and management |
| Hébergements | `/hebergements` | Accommodation listings |
| Paiements | `/paiements` | Payment tracking |
| Relances | `/relances` | Payment reminder management |
| Utilisateurs | `/utilisateurs` | User administration |
| Notifications | `/notifications` | Notification center |

### UI Components (shadcn/ui)

The project includes a comprehensive set of pre-built UI components:
- **Forms**: Input, Select, Checkbox, Radio, Switch, Form validation
- **Layout**: Card, Table, Tabs, Accordion, Collapsible
- **Navigation**: Menu, Dropdown, Sidebar, Breadcrumb
- **Feedback**: Alert, Dialog, Toast, Sonner notifications
- **Data Display**: Badge, Avatar, Progress, Skeleton
- **Date/Time**: Calendar, Date picker
- **Charts**: Built on Recharts

## Development Conventions

### Code Style

- **TypeScript**: Strict mode partially enabled (some relaxed rules for flexibility)
- **Path Aliases**: Use `@/` for `src/` directory imports
- **Component Naming**: PascalCase for components (e.g., `DashboardLayout.tsx`)
- **File Structure**: Co-locate related components in feature folders

### TypeScript Configuration

```json
{
  "baseUrl": ".",
  "paths": { "@/*": ["./src/*"] },
  "noImplicitAny": false,
  "noUnusedParameters": false,
  "noUnusedLocals": false,
  "strictNullChecks": false
}
```

### Testing Practices

- **Framework**: Vitest with jsdom environment
- **Test Files**: `src/**/*.{test,spec}.{ts,tsx}`
- **Utilities**: React Testing Library
- **Setup**: Global test setup in `src/test/setup.ts`

### Component Patterns

```tsx
// Standard component structure
import { cn } from "@/lib/utils";

interface ComponentProps {
  // props definition
}

export function Component({ prop }: ComponentProps) {
  return <div className={cn("...")} />;
}
```

## Mock Data

The `src/mock/` directory contains TypeScript mock data for development and testing:

- `clients.ts` - Client data
- `hebergements.ts` - Accommodation data
- `paiements.ts` - Payment records
- `utilisateurs.ts` - User data
- `relances.ts` - Reminder data
- `notifications.ts` - Notification data
- `dashboard.ts` - Dashboard statistics

## Design Assets

The `maquette/` directory contains SVG mockups for:
- Login screens (normal and error states)
- Dashboard overview
- Sidebar layouts
- List views (clients, accommodations, payments, users, notifications)
- UI components (app bar, buttons)

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build configuration with React SWC plugin |
| `tailwind.config.ts` | Tailwind CSS customization |
| `tsconfig.json` | TypeScript project references |
| `tsconfig.app.json` | Application TypeScript config |
| `tsconfig.node.json` | Node/Build TypeScript config |
| `eslint.config.js` | ESLint rules |
| `vitest.config.ts` | Vitest test configuration |
| `components.json` | shadcn/ui configuration |
| `postcss.config.js` | PostCSS plugins |

## Notes

- The project uses **Lovable** for visual development; changes made in Lovable sync automatically to this repository
- HMR overlay is disabled to prevent error popups during development
- The application uses a sidebar + app bar layout pattern for the admin interface
- All routes except `/` (login) are protected within the `DashboardLayout`
