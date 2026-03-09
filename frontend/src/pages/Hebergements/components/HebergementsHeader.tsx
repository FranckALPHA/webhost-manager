import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HebergementsHeaderProps {
  onAddHebergement?: () => void;
  onStatusChange?: (status: string) => void;
}

export const HebergementsHeader = ({ onAddHebergement, onStatusChange }: HebergementsHeaderProps = {}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground">Herbergements</h1>
      <div className="flex items-center gap-3">
        <Select onValueChange={onStatusChange}>
          <SelectTrigger className="w-32 rounded-full border-primary text-primary">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en-cours">En cours</SelectItem>
            <SelectItem value="expire">Expiré</SelectItem>
            <SelectItem value="tous">Tous</SelectItem>
          </SelectContent>
        </Select>
        <Button className="rounded-full" onClick={onAddHebergement}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter hebergement
        </Button>
      </div>
    </div>
  );
};
