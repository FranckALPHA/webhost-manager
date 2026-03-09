import { useQuery } from "@tanstack/react-query";
import { RelancesStats } from "./components/RelancesStats";
import { RelancesFilters } from "./components/RelancesFilters";
import { RelancesTable } from "./components/RelancesTable";
import { api } from "@/lib/api";

export const Relances = () => {
  const { data: relancesData, isLoading } = useQuery({
    queryKey: ["relances"],
    queryFn: () => api.relances.getAll(),
  });

  const { data: dashboardStats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => api.dashboard.getStats(),
  });

  const stats = [
    { label: "Relances récentes", value: dashboardStats?.relances_recentes || 0, color: "bg-blue-50 border-blue-200" },
    { label: "Expirations proches", value: dashboardStats?.hebergements_expires || 0, color: "bg-gray-50 border-gray-200" },
  ];

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleStatusChange = (status: string) => {
    console.log("Status changed:", status);
  };

  // Mappage des données du backend vers le format attendu par la table
  const mappedRelances = relancesData?.map((r: any) => ({
    id: r.id.toString(),
    client: `Hébergement #${r.hebergement_id}`, // On n'a pas le nom du client directement
    domaine: `ID: ${r.hebergement_id}`, 
    expiration: r.date_relance,
    niveau: "Moyen", // Non géré par le backend
    status: r.statut_relance === "envoyée" ? "Envoyé" : "En attente",
  })) || [];

  const handleMoreActions = (relance: any) => {
    console.log("More actions for:", relance);
  };

  if (isLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-foreground">Relances</h1>
      <RelancesStats stats={stats} />
      <RelancesFilters
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onSubmit={handleSearch}
      />
      <RelancesTable relances={mappedRelances} onMoreActions={handleMoreActions} />
    </div>
  );
};

export default Relances;
