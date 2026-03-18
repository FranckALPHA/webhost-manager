import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { VMsTable } from "./components/VMsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const VMs = () => {
  const queryClient = useQueryClient();
  const { data: vms, isLoading } = useQuery({
    queryKey: ["vms"],
    queryFn: () => api.vms.getAll(),
  });

  const actionMutation = useMutation({
    mutationFn: ({ id, action }: { id: number, action: any }) => api.vms.action(id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vms"] });
      toast.success("Action effectuée avec succès");
    },
    onError: (error: any) => {
      toast.error(error.message || "Une erreur est survenue");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.vms.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vms"] });
      toast.success("Simulation supprimée avec succès");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la suppression");
    }
  });

  const handleAddVM = () => {
    toast.info("Le provisioning de VM est géré via la page Hébergements");
  };

  const handleAction = (id: number, action: "start" | "stop" | "restart" | "suspend") => {
    actionMutation.mutate({ id, action });
  };

  const handleDelete = (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cette simulation ? Cette action est irréversible.")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Machines Virtuelles (Simulation)</h1>
          <p className="text-muted-foreground">Pilotez vos instances de serveurs virtuels.</p>
        </div>
      </div>
      <VMsTable 
        vms={vms || []} 
        onAction={handleAction} 
        onDelete={handleDelete}
      />
    </div>
  );
};

export default VMs;
