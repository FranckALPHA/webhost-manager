import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface Hosting {
  domaine: string;
  client: string;
  expiration: string;
}

interface ExpiringHostingsProps {
  hostings: Hosting[];
}

export const ExpiringHostings = ({ hostings }: ExpiringHostingsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Hebergement expirant bientôt</CardTitle>
        <button className="text-muted-foreground hover:text-foreground">
          <ExternalLink className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent className="space-y-3">
        {hostings.length > 0 ? hostings.map((h, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium text-foreground">{h.domaine}</p>
              <p className="text-xs text-muted-foreground">{h.client}</p>
            </div>
            <span className="text-xs text-destructive font-medium">{h.expiration}</span>
          </div>
        )) : (
          <p className="text-sm text-muted-foreground">Aucun hébergement expirant bientôt</p>
        )}
      </CardContent>
    </Card>
  );
};
