import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClientsHeaderProps {
  onAddClient?: () => void;
  onStatusChange?: (status: string) => void;
}

export const ClientsHeader = ({ onAddClient, onStatusChange }: ClientsHeaderProps = {}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground">Clients</h1>
      <div className="flex items-center gap-3">
        <Select onValueChange={onStatusChange}>
          <SelectTrigger className="w-32 rounded-full border-primary text-primary">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="actif">Actif</SelectItem>
            <SelectItem value="inactif">Inactif</SelectItem>
            <SelectItem value="tous">Tous</SelectItem>
          </SelectContent>
        </Select>
        <Button className="rounded-full" onClick={onAddClient}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter client
        </Button>
      </div>
    </div>
  );
};
