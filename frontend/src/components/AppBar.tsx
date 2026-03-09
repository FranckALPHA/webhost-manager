import { Search, User, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";

const AppBar = () => {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-card px-6">
      <div className="relative flex-1 max-w-md">
        <Input
          placeholder="Rechercher ici..."
          className="pr-10"
        />
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <User className="h-5 w-5" />
        </button>
        <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default AppBar;
