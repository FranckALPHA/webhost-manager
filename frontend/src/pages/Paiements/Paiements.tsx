import { useQuery } from "@tanstack/react-query";
import { PaiementsStats } from "./components/PaiementsStats";
import { PaiementsFilters } from "./components/PaiementsFilters";
import { PaiementsTable } from "./components/PaiementsTable";
import { api } from "@/lib/api";

export const Paiements = () => {
  const { data: paiementsData, isLoading } = useQuery({
    queryKey: ["paiements"],
    queryFn: () => api.paiements.getAll(),
  });

  const { data: dashboardStats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => api.dashboard.getStats(),
  });

  const stats = [
    { 
      label: "Total de revenu", 
      value: (dashboardStats?.total_paiements || 0).toLocaleString(), 
      suffix: "FCFA", 
      badge: "Total", 
      badgeColor: "bg-green-100 text-green-600", 
      color: "bg-blue-50 border-blue-200" 
    },
    { 
      label: "En attente", 
      value: (dashboardStats?.paiements_en_attente || 0).toString(), 
      suffix: "Transactions", 
      badge: "Actuel", 
      badgeColor: "bg-gray-100 text-gray-600", 
      color: "bg-gray-50 border-gray-200" 
    },
  ];

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleStatusChange = (status: string) => {
    console.log("Status changed:", status);
  };

  // Mappage des données du backend vers le format attendu par la table
  const mappedPaiements = paiementsData?.map((p: any) => ({
    id: p.id.toString(),
    client: `Client #${p.client_id}`, // Le backend PaiementOut n'inclut pas le nom du client par défaut
    prix: `${p.montant.toLocaleString()} FCFA`,
    date: p.date_paiement,
    methode: p.mode_paiement.toUpperCase(),
    status: p.statut_paiement === "payé" ? "En cours" : p.statut_paiement,
  })) || [];

  const handleView = (paiement: any) => {
    console.log("View paiement:", paiement);
  };

  if (isLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-foreground">Suivi paiement</h1>
      <PaiementsStats stats={stats} />
      <PaiementsFilters onSearch={handleSearch} onStatusChange={handleStatusChange} />
      <PaiementsTable paiements={mappedPaiements} onView={handleView} />
    </div>
  );
};

export default Paiements;
