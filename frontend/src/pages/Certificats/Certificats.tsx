import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { CertificatsTable } from "./components/CertificatsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Certificats = () => {
  const { data: certificats, isLoading } = useQuery({
    queryKey: ["certificats"],
    queryFn: () => api.certificats.getAll(),
  });

  const handleAddCertificat = () => {
    console.log("Add certificate clicked");
  };

  if (isLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Certificats SSL</h1>
          <p className="text-muted-foreground">Gérez vos certificats SSL pour vos domaines.</p>
        </div>
        <Button onClick={handleAddCertificat}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Certificat
        </Button>
      </div>
      <CertificatsTable certificats={certificats || []} />
    </div>
  );
};

export default Certificats;
