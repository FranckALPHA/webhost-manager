import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PaiementsStats } from "./components/PaiementsStats";
import { PaiementsFilters } from "./components/PaiementsFilters";
import { PaiementsTable } from "./components/PaiementsTable";
import { PaiementDialog } from "./components/PaiementDialog";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { toast } from "sonner";

export const Paiements = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: paiementsData, isLoading } = useQuery({
    queryKey: ["paiements"],
    queryFn: () => api.paiements.getAll(),
  });

  const { data: dashboardStats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => api.dashboard.getStats(),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.paiements.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paiements"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      setIsDialogOpen(false);
      toast.success("Paiement enregistré avec succès");
    },
    onError: (error: any) => toast.error(error.message),
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

  const handleDownloadInvoice = (paiement: any) => {
    toast.info(`Téléchargement de la facture ${paiement.id} en cours... (Simulation)`);
    // Simulation de génération PDF
    setTimeout(() => {
      toast.success("Facture téléchargée avec succès");
    }, 1500);
  };

  const mappedPaiements = paiementsData?.map((p: any) => ({
    id: p.id.toString(),
    client: `Client #${p.client_id}`,
    prix: `${p.montant.toLocaleString()} FCFA`,
    date: p.date_paiement,
    methode: p.mode_paiement.toUpperCase(),
    status: p.statut_paiement === "payé" ? "Payé" : "En attente",
  })) || [];

  if (isLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Suivi paiement</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau paiement
        </Button>
      </div>

      <PaiementsStats stats={stats} />
      <PaiementsFilters />
      <PaiementsTable 
        paiements={mappedPaiements} 
        onView={handleDownloadInvoice} 
      />

      <PaiementDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={(values) => createMutation.mutate(values)}
        isLoading={createMutation.isPending}
      />
    </div>
  );
};

export default Paiements;
