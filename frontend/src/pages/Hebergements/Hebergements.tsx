import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HebergementsHeader } from "./components/HebergementsHeader";
import { HebergementsTable } from "./components/HebergementsTable";
import { HebergementDialog } from "./components/HebergementDialog";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const Hebergements = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedHeb, setSelectedHeb] = useState<any>(null);

  const { data: hebergementsData, isLoading } = useQuery({
    queryKey: ["hebergements"],
    queryFn: () => api.hebergements.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.hebergements.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hebergements"] });
      setIsDialogOpen(false);
      toast.success("Hébergement créé");
    },
    onError: (error: any) => toast.error(error.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      api.hebergements.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hebergements"] });
      setIsDialogOpen(false);
      toast.success("Hébergement mis à jour");
    },
    onError: (error: any) => toast.error(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.hebergements.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hebergements"] });
      toast.success("Hébergement supprimé");
    },
    onError: (error: any) => toast.error(error.message),
  });

  const handleAdd = () => {
    setSelectedHeb(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (heb: any) => {
    setSelectedHeb(heb);
    setIsDialogOpen(true);
  };

  const handleDelete = (heb: any) => {
    if (confirm(`Supprimer ${heb.nom_domaine} ?`)) {
      deleteMutation.mutate(heb.id);
    }
  };

  const handleSubmit = (values: any) => {
    if (selectedHeb) {
      updateMutation.mutate({ id: selectedHeb.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  if (isLoading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="space-y-6 p-6">
      <HebergementsHeader onAddHebergement={handleAdd} onStatusChange={() => {}} />
      <HebergementsTable
        hebergements={hebergementsData || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <HebergementDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
        initialData={selectedHeb}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
};

export default Hebergements;
