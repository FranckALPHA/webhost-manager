import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

export interface Hebergement {
  id: number;
  nom_domaine: string;
  type_hebergement: string;
  client_id: number;
  date_debut: string;
  date_expiration: string;
  statut: string;
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
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Type</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Client ID</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Souscription</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Expiration</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Status</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hebergements.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-muted-foreground">{item.id}</TableCell>
                <TableCell className="font-medium">{item.nom_domaine}</TableCell>
                <TableCell className="text-muted-foreground capitalize">{item.type_hebergement}</TableCell>
                <TableCell className="text-muted-foreground">{item.client_id}</TableCell>
                <TableCell className="text-muted-foreground">{new Date(item.date_debut).toLocaleDateString()}</TableCell>
                <TableCell className="text-muted-foreground">{new Date(item.date_expiration).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    item.statut === 'actif' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {item.statut}
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
      </CardContent>
    </Card>
  );
};
