import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface Client {
  nom: string;
  jours: number;
  montant: string;
}

interface ClientsToRelanceProps {
  clients: Client[];
}

export const ClientsToRelance = ({ clients }: ClientsToRelanceProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Clients à relancer</CardTitle>
        <button className="text-muted-foreground hover:text-foreground">
          <ExternalLink className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent className="space-y-3">
        {clients.length > 0 ? clients.map((c, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium text-foreground">{c.nom}</p>
              <p className="text-xs text-muted-foreground">{c.jours} jours de retard</p>
            </div>
            <span className="text-sm font-semibold text-foreground">{c.montant}</span>
          </div>
        )) : (
          <p className="text-sm text-muted-foreground">Aucun client à relancer</p>
        )}
      </CardContent>
    </Card>
  );
};
