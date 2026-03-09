import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

export interface Client {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  nbHebergement: number;
}

interface ClientsTableProps {
  clients: Client[];
  onEdit?: (client: Client) => void;
  onDelete?: (client: Client) => void;
}

export const ClientsTable = ({ clients, onEdit, onDelete }: ClientsTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Noms</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Adresse Mail</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Téléphone</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Nombre d'hebergement</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.nom}</TableCell>
                <TableCell className="text-muted-foreground">{client.email}</TableCell>
                <TableCell className="text-muted-foreground">{client.telephone}</TableCell>
                <TableCell className="text-muted-foreground">{client.nbHebergement}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      className="text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => onEdit?.(client)}
                      aria-label="Modifier"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      onClick={() => onDelete?.(client)}
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
          0 lignes sur {clients.length} selectionnées
        </div>
      </CardContent>
    </Card>
  );
};
