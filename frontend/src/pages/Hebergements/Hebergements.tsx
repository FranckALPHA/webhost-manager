import { useQuery } from "@tanstack/react-query";
import { HebergementsHeader } from "./components/HebergementsHeader";
import { HebergementsTable } from "./components/HebergementsTable";
import { api } from "@/lib/api";

export const Hebergements = () => {
  const { data: hebergementsData, isLoading } = useQuery({
    queryKey: ["hebergements"],
    queryFn: () => api.hebergements.getAll(),
  });

  const handleAddHebergement = () => {
    console.log("Add hebergement clicked");
  };

  const handleStatusChange = (status: string) => {
    console.log("Status changed:", status);
  };

  // Mappage des données du backend vers le format attendu par la table
  const mappedHebergements = hebergementsData?.map((h: any) => ({
    id: h.id.toString(),
    domaine: h.nom_domaine,
    type: h.type_hebergement,
    client: h.client?.nom_client || `Client #${h.client_id}`,
    dateSouscription: h.date_debut,
    dateExpiration: h.date_expiration,
    status: h.statut === "actif" ? "En cours" : h.statut,
  })) || [];

  const handleEdit = (hebergement: any) => {
    console.log("Edit hebergement:", hebergement);
  };

  const handleDelete = (hebergement: any) => {
    console.log("Delete hebergement:", hebergement);
  };

  if (isLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <HebergementsHeader
        onAddHebergement={handleAddHebergement}
        onStatusChange={handleStatusChange}
      />
      <HebergementsTable
        hebergements={mappedHebergements}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Hebergements;
