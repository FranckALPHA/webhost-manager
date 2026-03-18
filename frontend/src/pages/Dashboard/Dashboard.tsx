import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardHeader } from "./components/DashboardHeader";
import { StatsCards } from "./components/StatsCards";
import { AnalysisChart } from "./components/AnalysisChart";
import { RecentPayments } from "./components/RecentPayments";
import { ExpiringHostings } from "./components/ExpiringHostings";
import { ClientsToRelance } from "./components/ClientsToRelance";
import { ClientDialog } from "../Clients/components/ClientDialog";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const Dashboard = () => {
  const queryClient = useQueryClient();
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => api.dashboard.getStats(),
  });

  const { data: paymentsData } = useQuery({
    queryKey: ["recent-payments"],
    queryFn: () => api.paiements.getAll(),
  });

  const { data: hebergementsExpirants } = useQuery({
    queryKey: ["expiring-hebergements"],
    queryFn: () => api.hebergements.getExpiresSoon(30),
  });

  const createClientMutation = useMutation({
    mutationFn: (data: any) => api.clients.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setIsClientDialogOpen(false);
      toast.success("Client créé avec succès");
    },
    onError: (error: any) => toast.error(error.message),
  });

  const stats = statsData
    ? [
        { label: "Clients", value: statsData.total_clients },
        { label: "Hébergements", value: statsData.total_hebergements },
        { label: "Paiements (FCFA)", value: statsData.total_paiements.toLocaleString() },
        { label: "Relances", value: statsData.relances_recentes },
      ]
    : [
        { label: "Clients", value: 0 },
        { label: "Hébergements", value: 0 },
        { label: "Paiements (FCFA)", value: "0" },
        { label: "Relances", value: 0 },
      ];

  const recentPayments = paymentsData?.slice(0, 5).map((p: any) => ({
    client: `Client #${p.client_id}`,
    date: new Date(p.date_paiement).toLocaleDateString(),
    montant: `${p.montant.toLocaleString()} FCFA`,
  })) || [];

  const expiringHebergements = hebergementsExpirants?.map((h: any) => ({
    domaine: h.nom_domaine,
    date: new Date(h.date_expiration).toLocaleDateString(),
    statut: h.statut,
  })) || [];

  // Données factices pour le graphique (à améliorer plus tard avec un endpoint dédié)
  const chartData = [
    { month: "Jan", ventes: 4000 },
    { month: "Feb", ventes: 3000 },
    { month: "Mar", ventes: 2000 },
    { month: "Apr", ventes: 2780 },
    { month: "May", ventes: 1890 },
    { month: "Jun", ventes: 2390 },
  ];

  if (statsLoading) {
    return <div className="p-6">Chargement du tableau de bord...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <DashboardHeader onAddClient={() => setIsClientDialogOpen(true)} />
      <StatsCards stats={stats} />
      
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <AnalysisChart data={chartData} />
        <RecentPayments payments={recentPayments} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ExpiringHostings hostings={expiringHebergements} />
        {/* On peut garder ClientsToRelance en mock ou le lier aux relances réelles */}
        <ClientsToRelance clients={[]} /> 
      </div>

      <ClientDialog 
        open={isClientDialogOpen}
        onOpenChange={setIsClientDialogOpen}
        onSubmit={(values) => createClientMutation.mutate(values)}
        isLoading={createClientMutation.isPending}
      />
    </div>
  );
};

export default Dashboard;
