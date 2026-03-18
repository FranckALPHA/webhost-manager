import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ServicesTable } from "./components/ServicesTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Services = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => api.services.getAll(),
  });

  const handleAddService = () => {
    console.log("Add service clicked");
  };

  const handleEdit = (service: any) => {
    console.log("Edit service:", service);
  };

  if (isLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-muted-foreground">Gérez les types de services proposés.</p>
        </div>
        <Button onClick={handleAddService}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Service
        </Button>
      </div>
      <ServicesTable services={services || []} onEdit={handleEdit} />
    </div>
  );
};

export default Services;
