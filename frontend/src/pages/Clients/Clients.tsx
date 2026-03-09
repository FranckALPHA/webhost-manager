import { useQuery } from "@tanstack/react-query";
import { ClientsHeader } from "./components/ClientsHeader";
import { ClientsTable } from "./components/ClientsTable";
import { api } from "@/lib/api";

export const Clients = () => {
  const { data: clientsData, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: () => api.clients.getAll(),
  });

  const handleAddClient = () => {
    console.log("Add client clicked");
  };

  const handleStatusChange = (status: string) => {
    console.log("Status changed:", status);
  };

  // On mappe les données du backend pour correspondre au format attendu par la table
  const mappedClients = clientsData?.map((c: any) => ({
    id: c.id,
    nom: c.nom_client,
    email: c.email,
    telephone: c.telephone || "-",
    nbHebergement: "0", // Le backend ne renvoie pas le décompte ici
  })) || [];

  const handleEdit = (client: any) => {
    console.log("Edit client:", client);
  };

  const handleDelete = (client: any) => {
    console.log("Delete client:", client);
  };

  if (isLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <ClientsHeader onAddClient={handleAddClient} onStatusChange={handleStatusChange} />
      <ClientsTable clients={mappedClients} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Clients;
