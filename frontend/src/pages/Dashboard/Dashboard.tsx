import { useQuery } from "@tanstack/react-query";
import { DashboardHeader } from "./components/DashboardHeader";
import { StatsCards } from "./components/StatsCards";
import { AnalysisChart } from "./components/AnalysisChart";
import { RecentPayments } from "./components/RecentPayments";
import { ExpiringHostings } from "./components/ExpiringHostings";
import { ClientsToRelance } from "./components/ClientsToRelance";
import { api } from "@/lib/api";
import {
  chartData,
  derniersPaiements,
  hebergementsExpirants,
  clientsARelancer,
} from "@/mock/dashboard";

export const Dashboard = () => {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => api.dashboard.getStats(),
  });

  const stats = statsData
    ? [
        { label: "Clients", value: statsData.total_clients },
        { label: "Hébergements", value: statsData.total_hebergements },
        { label: "Paiements (FCFA)", value: statsData.total_paiements },
        { label: "Relances", value: statsData.relances_recentes },
      ]
    : [
        { label: "Clients", value: 0 },
        { label: "Hébergements", value: 0 },
        { label: "Paiements (FCFA)", value: 0 },
        { label: "Relances", value: 0 },
      ];

  if (isLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <DashboardHeader />
      <StatsCards stats={stats} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <AnalysisChart data={chartData} />
        <RecentPayments payments={derniersPaiements} />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ExpiringHostings hostings={hebergementsExpirants} />
        <ClientsToRelance clients={clientsARelancer} />
      </div>
    </div>
  );
};

export default Dashboard;
