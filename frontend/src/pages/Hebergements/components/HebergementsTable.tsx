import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

export interface Hebergement {
  id: string;
  domaine: string;
  type: string;
  client: string;
  dateSouscription: string;
  dateExpiration: string;
  status: string;
}

interface HebergementsTableProps {
  hebergements: Hebergement[];
  onEdit?: (hebergement: Hebergement) => void;
  onDelete?: (hebergement: Hebergement) => void;
}

export const HebergementsTable = ({ hebergements, onEdit, onDelete }: HebergementsTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="uppercase text-xs font-semibold tracking-wider">ID</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Nom Domaine</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Type de Serveur</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Client</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Date Suscription</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Date Expiration</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Status</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hebergements.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-muted-foreground">{item.id}</TableCell>
                <TableCell className="text-muted-foreground">{item.domaine}</TableCell>
                <TableCell className="text-muted-foreground">{item.type}</TableCell>
                <TableCell className="font-medium">{item.client}</TableCell>
                <TableCell className="text-muted-foreground">{item.dateSouscription}</TableCell>
                <TableCell className="text-muted-foreground">{item.dateExpiration}</TableCell>
                <TableCell>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      className="text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => onEdit?.(item)}
                      aria-label="Modifier"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      onClick={() => onDelete?.(item)}
                      aria-label="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="px-4 py-3 text-sm text-muted-foreground">
          0 lignes sur {hebergements.length} selectionnées
        </div>
      </CardContent>
    </Card>
  );
};
