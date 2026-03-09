import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface UtilisateursFiltersProps {
  onSearch?: (query: string) => void;
  onSubmit?: () => void;
}

export const UtilisateursFilters = ({ onSearch, onSubmit }: UtilisateursFiltersProps = {}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Input
          placeholder="Rechercher ici..."
          className="h-10 w-[296px] pr-9"
          onChange={(e) => onSearch?.(e.target.value)}
        />
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
      <Button className="h-10 px-6" onClick={onSubmit}>
        Rechercher
      </Button>
    </div>
  );
};
