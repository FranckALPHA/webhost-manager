import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface RelancesFiltersProps {
  onSearch?: (query: string) => void;
  onStatusChange?: (status: string) => void;
  onSubmit?: () => void;
}

export const RelancesFilters = ({ onSearch, onStatusChange, onSubmit }: RelancesFiltersProps = {}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Input
          placeholder="Rechercher ici..."
          className="w-64 pr-9 rounded-full"
          onChange={(e) => onSearch?.(e.target.value)}
        />
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
      <Button className="rounded-full" onClick={onSubmit}>Rechercher</Button>
      <Select onValueChange={onStatusChange}>
        <SelectTrigger className="w-32 rounded-full">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous</SelectItem>
          <SelectItem value="envoye">Envoyé</SelectItem>
          <SelectItem value="en-attente">En attente</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
