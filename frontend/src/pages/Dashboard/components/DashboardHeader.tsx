import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardHeaderProps {
  onAddClient?: () => void;
}

export const DashboardHeader = ({ onAddClient }: DashboardHeaderProps = {}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground">Tableau de board</h1>
      <div className="flex items-center gap-3">
        <Select>
          <SelectTrigger className="w-32 border-primary text-primary">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="expired">Expiré</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={onAddClient}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter client
        </Button>
      </div>
    </div>
  );
};
