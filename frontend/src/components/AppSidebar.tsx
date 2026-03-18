import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Server,
  CreditCard,
  RefreshCw,
  UserCog,
  Bell,
  Globe,
  LogOut,
  Menu,
  ChevronDown,
  Send,
  ShieldCheck,
  Cpu,
  Settings,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Tableau de board" },
  { to: "/clients", icon: Users, label: "Clients" },
  { 
    icon: Server, label: "Hébergements",
    children: [
      { to: "/hebergements", label: "Tous les hébergements", icon: Server },
      { to: "/services", label: "Services", icon: Settings },
      { to: "/certificats", label: "Certificats SSL", icon: ShieldCheck },
      { to: "/vms", label: "Serveurs VPS (VM)", icon: Cpu },
    ]
  },
  { 
    icon: CreditCard, label: "Paiements", 
    children: [
      { to: "/paiements", label: "Historique paiements", icon: CreditCard },
    ]
  },
  { 
    icon: Send, label: "Relances",
    children: [
      { to: "/relances", label: "Suivi relances", icon: RefreshCw },
    ]
  },
  { to: "/utilisateurs", icon: UserCog, label: "Utilisateurs" },
  { to: "/logs", icon: RefreshCw, label: "Audit Logs" },
  { to: "/notifications", icon: Bell, label: "Notifications" },
];

const AppSidebar = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["Hébergements", "Paiements", "Relances"]);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-56 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Globe className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-sm font-bold text-sidebar-foreground">WebHost</span>
      </div>

      {/* Hamburger */}
      <div className="px-4 pb-2">
        <button className="text-sidebar-muted hover:text-sidebar-foreground">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 scrollbar-thin">
        {navItems.map((item) => {
          const hasChildren = "children" in item && item.children;
          const isExpanded = expandedMenus.includes(item.label);
          const isActive = "to" in item && location.pathname === item.to;
          const isChildActive = hasChildren && item.children?.some(c => location.pathname === c.to);

          if (hasChildren) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isChildActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isExpanded && "rotate-180")} />
                </button>
                {isExpanded && (
                  <div className="ml-7 mt-0.5 space-y-0.5">
                    {item.children?.map(child => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm transition-colors",
                          location.pathname === child.to
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-muted hover:text-sidebar-foreground"
                        )}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={"to" in item ? item.to : item.label}
              to={"to" in item ? item.to! : "#"}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </NavLink>
      </div>
    </aside>
  );
};

export default AppSidebar;
