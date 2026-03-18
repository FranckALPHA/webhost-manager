import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Clients } from "./pages/Clients";
import { Hebergements } from "./pages/Hebergements";
import { Paiements } from "./pages/Paiements";
import { Relances } from "./pages/Relances";
import { Utilisateurs } from "./pages/Utilisateurs";
import { Notifications } from "./pages/Notifications";
import { Services } from "./pages/Services";
import { Certificats } from "./pages/Certificats";
import { VMs } from "./pages/VMs";
import { Logs } from "./pages/Logs";
import { NotFound } from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/hebergements" element={<Hebergements />} />
            <Route path="/paiements" element={<Paiements />} />
            <Route path="/relances" element={<Relances />} />
            <Route path="/utilisateurs" element={<Utilisateurs />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/services" element={<Services />} />
            <Route path="/certificats" element={<Certificats />} />
            <Route path="/vms" element={<VMs />} />
            <Route path="/logs" element={<Logs />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
