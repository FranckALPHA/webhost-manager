import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface PaiementsFiltersProps {
  onSearch?: (query: string) => void;
  onStatusChange?: (status: string) => void;
}

export const PaiementsFilters = ({ onSearch, onStatusChange }: PaiementsFiltersProps = {}) => {
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
      <Select onValueChange={onStatusChange}>
        <SelectTrigger className="w-32 rounded-full">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous</SelectItem>
          <SelectItem value="en-cours">En cours</SelectItem>
          <SelectItem value="suspendu">Suspendu</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
