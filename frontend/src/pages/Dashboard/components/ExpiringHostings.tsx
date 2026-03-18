import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Hosting {
  domaine: string;
  date: string;
}

interface ExpiringHostingsProps {
  hostings: Hosting[];
}

export const ExpiringHostings = ({ hostings }: ExpiringHostingsProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Hébergements expirant bientôt</CardTitle>
        <button 
          onClick={() => navigate("/hebergements")}
          className="text-muted-foreground hover:text-foreground transition-colors"
          title="Voir tous les hébergements"
        >
          <ExternalLink className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent className="space-y-3">
        {hostings.length > 0 ? hostings.map((h, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium text-foreground">{h.domaine}</p>
            </div>
            <span className="text-xs text-destructive font-medium">Expire le {h.date}</span>
          </div>
        )) : (
          <p className="text-sm text-center py-4 text-muted-foreground">Aucun hébergement expirant prochainement</p>
        )}
      </CardContent>
    </Card>
  );
};
