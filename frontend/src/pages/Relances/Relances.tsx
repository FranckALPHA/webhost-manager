import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RelancesStats } from "./components/RelancesStats";
import { RelancesFilters } from "./components/RelancesFilters";
import { RelancesTable } from "./components/RelancesTable";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { RefreshCw, Send } from "lucide-react";
import { toast } from "sonner";

export const Relances = () => {
  const queryClient = useQueryClient();

  const { data: relancesData, isLoading } = useQuery({
    queryKey: ["relances"],
    queryFn: () => api.relances.getAll(),
  });

  const { data: dashboardStats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => api.dashboard.getStats(),
  });

  const autoGenMutation = useMutation({
    mutationFn: () => api.relances.autoGenerate(30),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["relances"] });
      toast.success(`${data.length} relance(s) générée(s) automatiquement.`);
    },
    onError: (error: any) => toast.error(error.message),
  });

  const stats = [
    { label: "Relances récentes", value: dashboardStats?.relances_recentes || 0, color: "bg-blue-50 border-blue-200" },
    { label: "Expirations proches", value: dashboardStats?.hebergements_expires || 0, color: "bg-gray-50 border-gray-200" },
  ];

  const mappedRelances = relancesData?.map((r: any) => ({
    id: r.id.toString(),
    client: `Hébergement #${r.hebergement_id}`,
    domaine: `ID: ${r.hebergement_id}`, 
    expiration: new Date(r.date_relance).toLocaleDateString(),
    niveau: "Moyen",
    status: r.statut_relance === "envoyé" ? "Envoyé" : "En attente",
  })) || [];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Relances</h1>
        <Button 
          variant="outline" 
          onClick={() => autoGenMutation.mutate()}
          disabled={autoGenMutation.isPending}
        >
          {autoGenMutation.isPending ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          Générer les relances du jour
        </Button>
      </div>

      <RelancesStats stats={stats} />
      <RelancesFilters />
      <RelancesTable relances={mappedRelances} />
    </div>
  );
};

export default Relances;
