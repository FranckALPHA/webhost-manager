import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UtilisateursHeaderProps {
  onAddUser?: () => void;
  onStatusChange?: (status: string) => void;
}

export const UtilisateursHeader = ({ onAddUser, onStatusChange }: UtilisateursHeaderProps = {}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-[42px] font-bold leading-none tracking-tight text-foreground">
        Gestion des utilisateurs
      </h1>
      <div className="flex items-center gap-3">
        <Select onValueChange={onStatusChange}>
          <SelectTrigger className="h-10 w-28 border-primary text-primary">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
        <Button className="h-10 px-5" onClick={onAddUser}>
          <Plus className="mr-1.5 h-4 w-4" />
          Ajouter utilisateur
        </Button>
      </div>
    </div>
  );
};
