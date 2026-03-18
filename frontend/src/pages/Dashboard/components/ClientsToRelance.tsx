import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Client {
  nom: string;
  jours: number;
  montant: string;
}

interface ClientsToRelanceProps {
  clients: Client[];
}

export const ClientsToRelance = ({ clients }: ClientsToRelanceProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Relances en attente</CardTitle>
        <button 
          onClick={() => navigate("/relances")}
          className="text-muted-foreground hover:text-foreground transition-colors"
          title="Voir toutes les relances"
        >
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
          <p className="text-sm text-center py-4 text-muted-foreground">Toutes les relances sont à jour</p>
        )}
      </CardContent>
    </Card>
  );
};
