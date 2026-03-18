import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientsHeader } from "./components/ClientsHeader";
import { ClientsTable, Client } from "./components/ClientsTable";
import { ClientDialog } from "./components/ClientDialog";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const Clients = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const { data: clientsData, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: () => api.clients.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.clients.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setIsDialogOpen(false);
      toast.success("Client créé avec succès");
    },
    onError: (error: any) => toast.error(error.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      api.clients.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setIsDialogOpen(false);
      setSelectedClient(null);
      toast.success("Client mis à jour avec succès");
    },
    onError: (error: any) => toast.error(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.clients.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Client supprimé avec succès");
    },
    onError: (error: any) => toast.error(error.message),
  });

  const handleAddClient = () => {
    setSelectedClient(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (client: any) => {
    // On doit retrouver les données complètes du client (avec adresse, etc.)
    const fullClient = clientsData?.find((c: any) => c.id === client.id);
    setSelectedClient(fullClient);
    setIsDialogOpen(true);
  };

  const handleDelete = (client: any) => {
    if (confirm(`Voulez-vous vraiment supprimer le client ${client.nom} ?`)) {
      deleteMutation.mutate(client.id);
    }
  };

  const handleFormSubmit = (values: any) => {
    if (selectedClient) {
      updateMutation.mutate({ id: selectedClient.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  const mappedClients =
    clientsData?.map((c: any) => ({
      id: c.id,
      nom: c.nom_client,
      email: c.email,
      telephone: c.telephone || "-",
      nbHebergement: "0",
    })) || [];

  if (isLoading) {
    return <div className="p-6 text-center">Chargement des clients...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <ClientsHeader onAddClient={handleAddClient} onStatusChange={() => {}} />
      
      <ClientsTable
        clients={mappedClients}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ClientDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleFormSubmit}
        initialData={selectedClient}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
};

export default Clients;
