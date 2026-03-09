import { useQuery } from "@tanstack/react-query";
import { UtilisateursHeader } from "./components/UtilisateursHeader";
import { UtilisateursFilters } from "./components/UtilisateursFilters";
import { UtilisateursTable } from "./components/UtilisateursTable";
import { api } from "@/lib/api";

export const Utilisateurs = () => {
  const { data: usersData, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.users.getAll(),
  });

  const handleAddUser = () => {
    console.log("Add user clicked");
  };

  const handleStatusChange = (status: string) => {
    console.log("Status changed:", status);
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  // Mappage des données du backend vers le format attendu par la table
  const mappedUsers = usersData?.map((u: any) => ({
    id: u.id.toString(),
    nom: u.username,
    email: u.email,
    role: u.role === "admin" ? "admin" : "user",
    date: u.created_at.split("T")[0],
    actionPassword: "copy" as const,
  })) || [];

  const handleGeneratePassword = (utilisateur: any) => {
    console.log("Generate password for:", utilisateur);
  };

  const handleCopyPassword = (utilisateur: any) => {
    console.log("Copy password for:", utilisateur);
  };

  const handleMoreActions = (utilisateur: any) => {
    console.log("More actions for:", utilisateur);
  };

  if (isLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <UtilisateursHeader onAddUser={handleAddUser} onStatusChange={handleStatusChange} />
      <UtilisateursFilters onSearch={handleSearch} onSubmit={handleSearch} />
      <UtilisateursTable
        utilisateurs={mappedUsers}
        onGeneratePassword={handleGeneratePassword}
        onCopyPassword={handleCopyPassword}
        onMoreActions={handleMoreActions}
      />
    </div>
  );
};

export default Utilisateurs;
