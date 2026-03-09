import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";

export interface Paiement {
  id: string;
  client: string;
  prix: string;
  date: string;
  methode: string;
  status: string;
}

interface PaiementsTableProps {
  paiements: Paiement[];
  onView?: (paiement: Paiement) => void;
}

export const PaiementsTable = ({ paiements, onView }: PaiementsTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID TRANSACTION</TableHead>
              <TableHead>CLIENTS</TableHead>
              <TableHead>PRIX</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>METHODE PAIEMENT</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paiements.map((p, i) => (
              <TableRow key={i}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.client}</TableCell>
                <TableCell>{p.prix}</TableCell>
                <TableCell>{p.date}</TableCell>
                <TableCell>{p.methode}</TableCell>
                <TableCell>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
                    {p.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onView?.(p)}
                    aria-label="Voir détails"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="px-4 py-3 text-sm text-muted-foreground">
          0 lignes sur {paiements.length} selectionnées
        </div>
      </CardContent>
    </Card>
  );
};
