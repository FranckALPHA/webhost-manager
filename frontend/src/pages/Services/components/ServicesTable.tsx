import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";

export interface Service {
  id: number;
  nom_service: string;
  description: string;
  prix_mensuel: number;
  is_active: boolean;
}

interface ServicesTableProps {
  services: Service[];
  onEdit?: (service: Service) => void;
}

export const ServicesTable = ({ services, onEdit }: ServicesTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Nom du Service</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Description</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Prix (Mensuel)</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Statut</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.nom_service}</TableCell>
                <TableCell className="text-muted-foreground">{service.description}</TableCell>
                <TableCell className="text-muted-foreground">{service.prix_mensuel} FCFA</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${service.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {service.is_active ? 'Actif' : 'Inactif'}
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => onEdit?.(service)}
                    aria-label="Modifier"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
