import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";

export interface Relance {
  id: string;
  client: string;
  domaine: string;
  expiration: string;
  niveau: string;
  status: string;
}

interface RelancesTableProps {
  relances: Relance[];
  onMoreActions?: (relance: Relance) => void;
}

export const RelancesTable = ({ relances, onMoreActions }: RelancesTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>CLIENTS</TableHead>
              <TableHead>DOMAINES</TableHead>
              <TableHead>EXPIRATION</TableHead>
              <TableHead>NIVEAU</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {relances.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.client}</TableCell>
                <TableCell>{r.domaine}</TableCell>
                <TableCell>{r.expiration}</TableCell>
                <TableCell>{r.niveau}</TableCell>
                <TableCell>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
                    {r.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onMoreActions?.(r)}
                    aria-label="Plus d'actions"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="px-4 py-3 text-sm text-muted-foreground">
          0 lignes sur {relances.length} selectionnées
        </div>
      </CardContent>
    </Card>
  );
};
